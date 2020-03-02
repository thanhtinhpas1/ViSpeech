import {Inject, Injectable, Logger} from '@nestjs/common';
import {IEventPublisher} from '@nestjs/cqrs';
import {IMessageSource} from '@nestjs/cqrs';
import {IEvent} from '@nestjs/cqrs';
import {Subject} from 'rxjs';
import * as xml2js from 'xml2js';
import * as http from 'http';
import {config} from '../../../config';

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

    private eventStore: any;
    private eventHandlers: object;
    private category: string;

    constructor(@Inject('EVENT_STORE_PROVIDER') eventStore: any) {
        this.category = 'vispeech';
        this.eventStore = eventStore;
        this.eventStore.connect({
            hostname: config.EVENT_STORE_SETTINGS.hostname,
            port: config.EVENT_STORE_SETTINGS.tcpPort,
            credentials: config.EVENT_STORE_SETTINGS.credentials,
            poolOptions: config.EVENT_STORE_SETTINGS.poolOptions,
        });
    }

    async publish<T extends IEvent>(event: T) {
        const streamName = `${this.category}`;
        const type = event.constructor.name;
        try {
            Logger.log(streamName, 'Write event ...');
            await this.eventStore.client.writeEvent(streamName, type, event);
        } catch (err) {
            console.trace(err);
        }
    }

    /**
     * @description Event Store bridge subscribes to domain category stream
     * @param subject
     */
    async bridgeEventsTo<T extends IEvent>(subject: Subject<T>) {
        const streamName = `${this.category}`;
        const onEvent = async (subscription, event) => {
            try {
                const streamId = event.streamId;
                const eventNumber = event.eventNumber;
                const eventUrl = eventStoreHostUrl + `${streamId}/${eventNumber}`;
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
                            xml2js.parseString(rawData, {explicitArray: false}, (err, result) => {
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
                            Logger.error(e.message, '', 'PARSE ERROR');
                        }
                    });
                });
            } catch (error) {
                Logger.error(error, '', 'EVENT');
            }
        };

        const onDropped = (subscription, reason, error) => {
            console.trace(subscription, reason, error);
        };

        try {
            Logger.log(streamName, 'Subscribe to stream ...');
            await this.eventStore.client.subscribeToStream(streamName, onEvent, onDropped, false);
        } catch (err) {
            console.trace(err);
        }
    }

    setEventHandlers(eventHandlers) {
        this.eventHandlers = {...this.eventHandlers, ...eventHandlers};
    }
}