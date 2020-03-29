import { OnModuleInit } from '@nestjs/common';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { EventStore } from '../core/event-store/event-store';
import { CallAsrEvent } from './events/impl/call-asr.event';
export declare class RequestModule implements OnModuleInit {
    private readonly command$;
    private readonly query$;
    private readonly event$;
    private readonly eventStore;
    constructor(command$: CommandBus, query$: QueryBus, event$: EventBus, eventStore: EventStore);
    onModuleInit(): any;
    eventHandlers: {
        CallAsrEvent: (streamId: any, requestDto: any, tokenDto: any) => CallAsrEvent;
    };
}
