/* tslint:disable:variable-name */
import { Inject, Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { EventBus, IEvent, IEventPublisher, IMessageSource } from '@nestjs/cqrs';
import { ExplorerService } from '@nestjs/cqrs/dist/services/explorer.service';
import * as Long from 'long';
import {
    createJsonEventData,
    EventData,
    EventStoreCatchUpSubscription,
    EventStorePersistentSubscription,
    EventStoreSubscription as EventStoreVolatileSubscription,
    expectedVersion,
    ResolvedEvent,
} from 'node-eventstore-client';
import { Subject } from 'rxjs';
import { v4 } from 'uuid';
import { MongoStore } from './adapter/mongo-store';
import {
    EventStoreCatchupSubscription as ESCatchUpSubscription,
    EventStoreModuleOptions,
    EventStoreOptionConfig,
    EventStorePersistentSubscription as ESPersistentSubscription,
    EventStoreSubscription,
    EventStoreSubscriptionType,
    EventStoreVolatileSubscription as ESVolatileSubscription,
    ExtendedCatchUpSubscription,
    ExtendedPersistentSubscription,
    ExtendedVolatileSubscription,
    IEventConstructors,
    ProvidersConstants,
} from './contract';
import { NestjsEventStore } from './nestjs-event-store.class';
import { PersistentSubscriptionOptions } from 'geteventstore-promise';

/**
 * @class EventStore
 * @description The EventStore.org bridge. By design, the domain category
 * (i.e. user) events are being subscribed to. Upon events being received,
 * internal event handlers are responsible for the handling of events.
 */
@Injectable()
export class EventStore implements IEventPublisher, IMessageSource, OnModuleDestroy, OnModuleInit {
    private logger = new Logger(this.constructor.name);
    private eventStore: NestjsEventStore;
    private store: MongoStore;
    private eventHandlers: IEventConstructors;
    private subject$: Subject<IEvent>;
    private readonly featureStream?: string;
    private catchupSubscriptions: Array<Promise<ExtendedCatchUpSubscription>> = [];
    private catchupSubscriptionsCount: number;
    private isReplayed: boolean = false;
    private subscriptions: EventStoreSubscription[] = [];

    private persistentSubscriptions: ExtendedPersistentSubscription[] = [];
    private persistentSubscriptionsCount: number;

    private volatileSubscriptions: ExtendedVolatileSubscription[] = [];
    private volatileSubscriptionsCount: number;
    private esStreamConfig: EventStoreOptionConfig;

    constructor(
        @Inject(ProvidersConstants.EVENT_STORE_PROVIDER) eventStore: any,
        @Inject(ProvidersConstants.EVENT_STORE_CONNECTION_CONFIG_PROVIDER) configService: EventStoreModuleOptions,
        @Inject(ProvidersConstants.EVENT_STORE_STREAM_CONFIG_PROVIDER) esStreamConfig: EventStoreOptionConfig,
        private readonly explorerService: ExplorerService,
        private readonly eventsBus: EventBus,
        private readonly mongoStore: MongoStore,
    ) {
        this.store = mongoStore;
        this.eventStore = eventStore;
        this.esStreamConfig = esStreamConfig;
        this.featureStream = esStreamConfig.featureStreamName;
        this.addEventHandlers(esStreamConfig.eventHandlers);
        this.eventStore.connect(configService.options, configService.tcpEndpoint);

        const catchupSubscriptions = esStreamConfig.subscriptions.filter((sub) => {
            return sub.type === EventStoreSubscriptionType.CatchUp;
        });

        const persistentSubscriptions = esStreamConfig.subscriptions.filter((sub) => {
            return sub.type === EventStoreSubscriptionType.Persistent;
        });

        const volatileSubscriptions = esStreamConfig.subscriptions.filter((sub) => {
            return sub.type === EventStoreSubscriptionType.Volatile;
        });

        this.subscribeToCatchUpSubscriptions(
            catchupSubscriptions as ESCatchUpSubscription[],
        );

        this.subscribeToPersistentSubscriptions(
            persistentSubscriptions as ESPersistentSubscription[],
        );

        this.subscribeToVolatileSubscriptions(
            volatileSubscriptions as ESVolatileSubscription[],
        );
    }

    async publish(event: IEvent, stream?: string) {
        if ([null, undefined].includes(event)) {
            return;
        }

        const eventPayload: EventData = createJsonEventData(
            v4(),
            event,
            null,
            event['eventType'] || stream,
        );
        // it's hack for find out streamId by include stream
        const streams = ['Token', 'Order', 'Permission', 'Report', 'Project', 'User', 'Request', 'Role', 'Task', 'Monitor'];
        const streamName = streams.map(stream => eventPayload.type.includes(stream) ? stream : null)
            .filter(event => event != null)[0];
        const streamId = stream ? stream : `$ce-${streamName?.toLowerCase() ?? 'user'}`;
        try {
            let version = await this.store.readExpectedVersion(streamId);
            const lcp = await this.store.read(streamId);
            // case when does not exist stream => expected version will be overlap with case start event  = 0
            // so in this case we accept for all event have event number less than 1
            if (version === 0) {
                version = expectedVersion.any;
                await this.store.writeExpectedVersion(streamId, 1);
            } else if (version < lcp && version !== -1) {
                version = lcp;
                await this.store.writeExpectedVersion(streamId, version + 1);
            } else {
                await this.store.writeExpectedVersion(streamId, version + 1);
            }
            await this.eventStore.getConnection().appendToStream(streamId, expectedVersion.any, [eventPayload]);
        } catch (err) {
            if (err.name === 'WrongExpectedVersionError') {
                this.logger.warn('Detect duplicate event ' + eventPayload.type + ' ' + err.message);
            } else this.logger.error(err);
        }
    }

    async createPersistentSubscriptions(
        subscriptions: ESPersistentSubscription[],
    ) {
        await Promise.all(
            subscriptions.map(async (subscription) => {
                return await this.createPersistentSubscription(
                    subscription.stream,
                    subscription.persistentSubscriptionName,
                );
            }),
        );
    }

    async subscribeToPersistentSubscriptions(
        subscriptions: ESPersistentSubscription[],
    ) {
        this.persistentSubscriptionsCount = subscriptions.length;
        this.persistentSubscriptions = await Promise.all(
            subscriptions.map(async (subscription) => {
                return await this.subscribeToPersistentSubscription(
                    subscription.stream,
                    subscription.persistentSubscriptionName,
                );
            }),
        );
    }

    async subscribeToCatchUpSubscriptions(subscriptions: ESCatchUpSubscription[], isLive: boolean = false) {
        this.catchupSubscriptionsCount = subscriptions.length;
        this.catchupSubscriptions = subscriptions.map(async (subscription) => {
            if (this.store) {
                const lcp = (await this.store.read(subscription.stream)) || 0;
                if (lcp === 0) isLive = true;
                // just set isLive when lcp catch up processing live
                return this.subscribeToCatchupSubscription(
                    subscription.stream,
                    subscription.resolveLinkTos,
                    lcp,
                    isLive
                );
            }
        });
    }

    async subscribeToVolatileSubscriptions(subscriptions: ESVolatileSubscription[]) {
        this.volatileSubscriptionsCount = subscriptions.length;
        this.volatileSubscriptions = await Promise.all(
            subscriptions.map(async (subscription) => {
                return await this.subscribeToVolatileSubscription(subscription.stream, subscription.resolveLinkTos);
            })
        );
    }

    subscribeToCatchupSubscription(
        stream: string,
        resolveLinkTos: boolean = true,
        lastCheckpoint: number | Long | null = 0,
        isLive: boolean,
    ): ExtendedCatchUpSubscription {
        this.logger.log(`Catching up and subscribing to stream ${stream}!`);
        try {
            return this.eventStore.getConnection().subscribeToStreamFrom(
                stream,
                lastCheckpoint,
                resolveLinkTos,
                (sub, payload) => this.onEvent(sub, payload),
                subscription => {
                    if (isLive) {
                        this.onLiveProcessingStarted(
                            subscription as ExtendedCatchUpSubscription,
                        );
                    }
                },
                (sub, reason, error) =>
                    this.onDropped(sub as ExtendedCatchUpSubscription, reason, error),
            ) as ExtendedCatchUpSubscription;
        } catch (err) {
            this.logger.error(err);
        }
    }

    async subscribeToVolatileSubscription(stream: string, resolveLinkTos: boolean = true): Promise<ExtendedVolatileSubscription> {
        this.logger.log(`Volatile and subscribing to stream ${stream}!`);
        try {
            const resolved = await this.eventStore.getConnection().subscribeToStream(
                stream,
                resolveLinkTos,
                (sub, payload) => this.onEvent(sub, payload),
                (sub, reason, error) =>
                    this.onDropped(sub as ExtendedVolatileSubscription, reason, error),
            ) as ExtendedVolatileSubscription;

            this.logger.log('Volatile processing of EventStore events started!');
            resolved.isLive = true;
            return resolved;
        } catch (err) {
            this.logger.error(err);
        }
    }

    get allCatchUpSubscriptionsLive(): boolean {
        const initialized =
            this.catchupSubscriptions.length === this.catchupSubscriptionsCount;
        return (
            initialized &&
            this.catchupSubscriptions.every(async (subscription) => {
                const s = await subscription;
                return !!s && s.isLive;
            })
        );
    }

    get allVolatileSubscriptionsLive(): boolean {
        const initialized =
            this.volatileSubscriptions.length === this.volatileSubscriptionsCount;
        return (
            initialized &&
            this.volatileSubscriptions.every((subscription) => {
                return !!subscription && subscription.isLive;
            })
        );
    }

    get allPersistentSubscriptionsLive(): boolean {
        const initialized =
            this.persistentSubscriptions.length === this.persistentSubscriptionsCount;
        return (
            initialized &&
            this.persistentSubscriptions.every((subscription) => {
                return !!subscription && subscription.isLive;
            })
        );
    }

    async createPersistentSubscription(
        stream: string,
        subscriptionName: string,
    ): Promise<string> {
        try {
            this.logger.log(`
       Created persistent subscription ${subscriptionName} on stream ${stream}!`);
            const result = await this.eventStore.getConnection().createPersistentSubscription(
                stream,
                subscriptionName,
                {
                    readBatchSize: 10024,
                    historyBufferSize: 100024,
                    liveBufferSize: 100024,
                    maxRetryCount: 10,
                    checkPointAfter: 0,
                    startFrom: 0,
                    resolveLinkTo: true,
                    minCheckPointCount: 10,
                    maxCheckPointCount: 10000,
                    maxSubscriberCount: 10,
                    messageTimeout: 10000,
                } as PersistentSubscriptionOptions,
            );

            return result.status;
        } catch (err) {
            this.logger.error(err.message);
        }
    }

    async subscribeToPersistentSubscription(
        stream: string,
        subscriptionName: string,
    ): Promise<ExtendedPersistentSubscription> {
        try {
            this.logger.log(`
       Connecting to persistent subscription ${subscriptionName} on stream ${stream}!`);

            const resolved = await this.eventStore.getConnection().connectToPersistentSubscription(
                stream,
                subscriptionName,
                (sub, payload) => this.onEvent(sub, payload),
                (sub, reason, error) =>
                    this.onDropped(sub as ExtendedPersistentSubscription, reason, error),
            ) as ExtendedPersistentSubscription;

            resolved.isLive = true;

            return resolved;
        } catch (err) {
            this.logger.error(err.message);
        }
    }

    async onEvent(
        _subscription:
            | EventStorePersistentSubscription
            | EventStoreCatchUpSubscription
            | EventStoreVolatileSubscription,
        payload: ResolvedEvent,
    ) {
        const { event } = payload;

        if (!event || !event.isJson) {
            this.logger.error('Received event that could not be resolved!');
            return;
        }
        const rawData = JSON.parse(event.data.toString());
        const data = Object.values(rawData);
        let eventType;
        const handler = this.eventHandlers[eventType = rawData.eventType] || this.eventHandlers[eventType = event.eventType];
        if (!handler) {
            this.logger.warn(`Received event that could not be handled! ${eventType}`);
            return;
        }

        if (this.eventHandlers && this.eventHandlers[eventType]) {
            Logger.log(`EventStore write event ${eventType}`);
            // monitor log case event
            if (eventType === '$statsCollected') {
                this.subject$?.next(this.eventHandlers[eventType](v4(), rawData));
            } else {
                this.subject$?.next(this.eventHandlers[eventType](...data));
            }
            if (this.store) {
                if (this.store && _subscription.constructor.name === 'EventStoreStreamCatchUpSubscription') {
                    await this.store.write(event.eventStreamId, payload.event.eventNumber.toInt());
                }
                const lcp = (await this.store.read(event.eventStreamId)) || 0;
                if (lcp === (payload.event.eventNumber.toInt() - 1) && this.isReplayed) {
                    this.isReplayed = true;
                    this.subscribeToCatchUpSubscriptions(
                        this.subscriptions as ESCatchUpSubscription[],
                        true,
                    );
                }
            }
        } else {
            Logger.warn(`Event of type ${eventType} not handled`, this.constructor.name);
        }
    }

    onDropped(
        subscription: ExtendedPersistentSubscription | ExtendedCatchUpSubscription | ExtendedVolatileSubscription,
        _reason: string,
        error: Error,
    ) {
        subscription.isLive = false;
        this.logger.error('onDropped => ' + error);
    }

    onLiveProcessingStarted(subscription: ExtendedCatchUpSubscription) {
        subscription.isLive = true;
        this.logger.log('Live processing of EventStore events started!');
    }

    get isLive(): boolean {
        return (
            this.allCatchUpSubscriptionsLive && this.allPersistentSubscriptionsLive && this.allVolatileSubscriptionsLive
        );
    }

    addEventHandlers(eventHandlers: IEventConstructors) {
        this.eventHandlers = { ...this.eventHandlers, ...eventHandlers };
    }

    onModuleInit(): any {
        this.subject$ = (this.eventsBus as any).subject$;
        this.bridgeEventsTo((this.eventsBus as any).subject$);
        this.eventsBus.publisher = this;
    }

    onModuleDestroy(): any {
        this.eventStore.close();
    }

    close(): any {
        this.eventStore.close();
    }

    async bridgeEventsTo<T extends IEvent>(subject: Subject<T>): Promise<any> {
        this.subject$ = subject;
    }
}