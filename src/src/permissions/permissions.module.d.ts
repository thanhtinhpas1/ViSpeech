import { OnModuleInit } from '@nestjs/common';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { EventStore } from 'core/event-store/event-store';
import { PermissionCreatedEvent, PermissionCreatedFailedEvent, PermissionCreatedSuccessEvent } from './events/impl/permission-created.event';
import { PermissionDeletedEvent } from './events/impl/permission-deleted.event';
import { PermissionUpdatedEvent } from './events/impl/permission-updated.event';
import { PermissionWelcomedEvent } from './events/impl/permission-welcomed.event';
import { PermissionAssignEmailSentEvent, PermissionAssignEmailSentFailedEvent, PermissionAssignEmailSentSuccessEvent } from './events/impl/permission-assign-email-sent.event';
import { PermissionAssignRepliedEvent } from './events/impl/permission-assign-replied.event';
export declare class PermissionsModule implements OnModuleInit {
    private readonly command$;
    private readonly query$;
    private readonly event$;
    private readonly eventStore;
    constructor(command$: CommandBus, query$: QueryBus, event$: EventBus, eventStore: EventStore);
    onModuleInit(): Promise<void>;
    static eventHandlers: {
        PermissionCreatedEvent: (streamId: any, data: any) => PermissionCreatedEvent;
        PermissionCreatedSuccessEvent: (streamId: any, data: any) => PermissionCreatedSuccessEvent;
        PermissionCreatedFailedEvent: (streamId: any, data: any, error: any) => PermissionCreatedFailedEvent;
        PermissionDeletedEvent: (streamId: any, data: any) => PermissionDeletedEvent;
        PermissionUpdatedEvent: (streamId: any, data: any) => PermissionUpdatedEvent;
        PermissionWelcomedEvent: (streamId: any, data: any) => PermissionWelcomedEvent;
        PermissionAssignEmailSentEvent: (streamId: any, data: any) => PermissionAssignEmailSentEvent;
        PermissionAssignEmailSentSuccessEvent: (streamId: any, data: any) => PermissionAssignEmailSentSuccessEvent;
        PermissionAssignEmailSentFailedEvent: (streamId: any, data: any, error: any) => PermissionAssignEmailSentFailedEvent;
        PermissionAssignRepliedEvent: (streamId: any, data: any) => PermissionAssignRepliedEvent;
    };
}
