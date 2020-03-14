import { Logger } from "@nestjs/common";
import { AggregateRoot } from "@nestjs/cqrs";
import { AssignedRoleEvent } from "users/events/impl/role-assigned.event";
import {
  UserCreationStartedEvent,
  UserCreatedEvent
} from "../events/impl/user-created.event";
import { UserDeletedEvent } from "../events/impl/user-deleted.event";
import { UserUpdatedEvent } from "../events/impl/user-updated.event";
import { UserWelcomedEvent } from "../events/impl/user-welcomed.event";

export class User extends AggregateRoot {
  [x: string]: any;

  constructor(private readonly id: string | undefined) {
    super();
  }

  setData(data) {
    this.data = data;
  }

  createUserStart(transactionId: string) {
    this.apply(new UserCreationStartedEvent(transactionId, this.data));
  }

  createUser(transactionId: string) {
    this.apply(new UserCreatedEvent(transactionId, this.data));
  }

  updateUser() {
    this.apply(new UserUpdatedEvent(this.data));
  }

  welcomeUser() {
    this.apply(new UserWelcomedEvent(this.id));
  }

  deleteUser() {
    this.apply(new UserDeletedEvent(this.id));
  }

  assignRoleUser(userId, roleName, assignerId) {
    try {
      this.apply(new AssignedRoleEvent(userId, roleName, assignerId));
    } catch (e) {
      Logger.error(e, '', '[UserModel] assignRoleUser');
    }
  }
}
