import {AggregateRoot} from '@nestjs/cqrs';
import {PermissionCreatedEvent} from '../events/impl/permission-created.event';
import {PermissionUpdatedEvent} from '../events/impl/permission-updated.event';
import {PermissionDeletedEvent} from '../events/impl/permission-deleted.event';
import {PermissionWelcomedEvent} from '../events/impl/permission-welcomed.event';
import {PermissionAssignEmailSentEvent} from 'permissions/events/impl/permission-assign-email-sent.event';
import {PermissionAssignRepliedEvent} from 'permissions/events/impl/permission-assign-replied.event';

export class Permission extends AggregateRoot {
    [x: string]: any;

    constructor(private readonly id: string | undefined) {
        super();
    }

    setData(data) {
        this.data = data;
    }

    createPermission(streamId: string) {
        this.apply(new PermissionCreatedEvent(streamId, this.data));
    }

    updatePermission(streamId: string) {
        this.apply(new PermissionUpdatedEvent(streamId, this.data));
    }

    welcomePermission(streamId: string) {
        this.apply(new PermissionWelcomedEvent(streamId, this.id));
    }

    deletePermission(streamId: string) {
        this.apply(new PermissionDeletedEvent(streamId, this.id));
    }

    sendAssignPermissionEmail(streamId: string) {
        this.apply(new PermissionAssignEmailSentEvent(streamId, this.data));
    }

    replyPermissionAssign(streamId: string) {
        this.apply(new PermissionAssignRepliedEvent(streamId, this.data));
    }
}
