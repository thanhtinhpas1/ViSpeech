import { Inject, Injectable, Logger } from '@nestjs/common';
import { IEvent, IEventPublisher, IMessageSource } from '@nestjs/cqrs';
import { TCPClient } from 'geteventstore-promise';
import * as http from 'http';
import { Subject } from 'rxjs';
import * as xml2js from 'xml2js';
import { config } from '../../../config';
import { BaseEventStore } from './base-event-store.class';

const eventStoreHostUrl = config.EVENT_STORE_SETTINGS.protocol +
    `://${config.EVENT_STORE_SETTINGS.hostname}:${config.EVENT_STORE_SETTINGS.httpPort}/streams/`;

/**
 * @class EventStore
 * @description The EventStore.org bridge. By design, the domain category
 * (i.e. user) events are being subscribed to. Upon events being received,
 * internal event handlers are responsible for the handling of events.
 */
@Injectable()
export class EventStore implements IEventPublisher, IMessageSource {

    private eventStore: BaseEventStore;
    private client: TCPClient;
    private eventHandlers: object;
    private category: string;

    constructor(@Inject('EVENT_STORE_PROVIDER') eventStore: any) {
        this.eventStore = eventStore;
        this.category = config.EVENT_STORE_SETTINGS.category;
        this.eventStore.connect({
            hostname: config.EVENT_STORE_SETTINGS.hostname,
            port: config.EVENT_STORE_SETTINGS.tcpPort,
            credentials: config.EVENT_STORE_SETTINGS.credentials,
            poolOptions: config.EVENT_STORE_SETTINGS.poolOptions,
        });
        this.client = this.eventStore.client;
    }

    async publish<T extends IEvent>(event: T) {
        const message = JSON.parse(JSON.stringify(event));
        const transactionId = message.transactionId;
        const streamName = `${this.category}-${transactionId}`;
        const type = event.constructor.name;
        try {
            Logger.log('Write event ...', streamName);
            await this.client.writeEvent(streamName, type, event);
        } catch (err) {
            console.trace(err);
        }
    }

    /**
     * @description Event Store bridge subscribes to domain category stream
     * @param subject
     */
    async bridgeEventsTo<T extends IEvent>(subject: Subject<T>) {
        const streamName = `$ce-${this.category}`;
        const onEvent = async (subscription, event) => {
            try {
                const eventUrl = eventStoreHostUrl +
                    `${event.metadata.$o}/${event.data.split('@')[0]}`;
                const httpOptions = {
                    headers: {
                        Authorization: 'Basic YWRtaW46Y2hhbmdlaXQ=',
                    },
                };
                http.get(eventUrl, httpOptions, (res) => {
                    res.setEncoding('utf8');
                    let rawData = '';
                    res.on('data', (chunk) => {
                        rawData += chunk;
                    });
                    res.on('end', () => {
                        try {
                            xml2js.parseString(rawData, { explicitArray: false }, (err, result) => {
                                if (err) {
                                    console.trace(err);
                                    return;
                                }
                                const content = result['atom:entry']['atom:content'];
                                const eventType = content.eventType;
                                const data = content.data;
                                event = this.eventHandlers[eventType](...Object.values(data));
                                subject.next(event);
                            });
                        } catch (e) {
                            Logger.error('Parse error', e.message);
                        }
                    });
                });
            } catch (error) {
                Logger.log('Event', error);
            }
        };

        const onDropped = (subscription, reason, error) => {
            console.trace(subscription, reason, error);
        };

        try {
            Logger.log('Subscribe stream ...', streamName);
            await this.client.subscribeToStream(streamName, onEvent, onDropped, false);
        } catch (err) {
            console.trace(err);
        }
    }

    setEventHandlers(eventHandlers) {
        this.eventHandlers = eventHandlers;
    }
}