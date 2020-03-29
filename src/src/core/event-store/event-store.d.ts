import { IEvent, IEventPublisher, IMessageSource } from '@nestjs/cqrs';
import { Subject } from 'rxjs';
export declare class EventStore implements IEventPublisher, IMessageSource {
    private eventStore;
    private client;
    private eventHandlers;
    private category;
    constructor(eventStore: any);
    publish<T extends IEvent>(event: T): Promise<void>;
    bridgeEventsTo<T extends IEvent>(subject: Subject<T>): Promise<void>;
    setEventHandlers(eventHandlers: any): void;
}
