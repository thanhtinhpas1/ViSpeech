import {AggregateRoot} from '@nestjs/cqrs';
import {UserCreatedEvent, UserCreationStartedEvent} from '../events/impl/user-created.event';
import {UserDeletedEvent} from '../events/impl/user-deleted.event';
import {UserUpdatedEvent} from '../events/impl/user-updated.event';
import {UserRoleAssignedEvent} from '../events/impl/user-role-assigned.event';
import {PasswordChangedEvent} from '../events/impl/password-changed.event';

export class User extends AggregateRoot {
    [x: string]: any;

    constructor(private readonly id: string | undefined) {
        super();
    }

    setData(data) {
        this.data = data;
    }

    createUserStart(streamId: string) {
        this.apply(new UserCreationStartedEvent(streamId, this.data));
    }

    createUser(streamId: string) {
        this.apply(new UserCreatedEvent(streamId, this.data));
    }

    updateUser(streamId: string) {
        this.apply(new UserUpdatedEvent(streamId, this.data));
    }

    deleteUser(streamId: string) {
        this.apply(new UserDeletedEvent(streamId, this.id));
    }

    assignUserRole(streamId: string, roleName: string, assignerId: string) {
        this.apply(new UserRoleAssignedEvent(streamId, this.id, roleName, assignerId));
    }

    changePassword(streamId: string, newPassword: string, oldPassword: string) {
        this.apply(new PasswordChangedEvent(streamId, this.id, newPassword, oldPassword));
    }
}
