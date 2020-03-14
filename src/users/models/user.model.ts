import {Logger} from "@nestjs/common";
import {AggregateRoot} from "@nestjs/cqrs";
import {UserCreatedEvent, UserCreationStartedEvent} from "../events/impl/user-created.event";
import {UserDeletedEvent} from "../events/impl/user-deleted.event";
import {UserUpdatedEvent} from "../events/impl/user-updated.event";
import {UserRoleAssignedEvent} from "../events/impl/user-role-assigned.event";

export class User extends AggregateRoot {
    [x: string]: any;

    constructor(private readonly id: string | undefined) {
        super();
    }

    setData(data) {
        this.data = data;
    }

    createUserStart(transactionId: string) {
        this.apply(new UserCreationStartedEvent(this.data));
    }

    createUser() {
        this.apply(new UserCreatedEvent(this.data));
    }

    updateUser() {
        this.apply(new UserUpdatedEvent(this.data));
    }

    deleteUser() {
        this.apply(new UserDeletedEvent(this.id));
    }

    assignUserRole(roleName: string, assignerId: string) {
        try {
            this.apply(new UserRoleAssignedEvent(this.id, roleName, assignerId));
        } catch (err) {
            Logger.error(err.message, '', '[UserModel] assignUserRole');
        }
    }
}
