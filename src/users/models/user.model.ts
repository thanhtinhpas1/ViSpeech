import { AggregateRoot } from "@nestjs/cqrs";
import {
  UserCreationStartedEvent,
  UserCreatedEvent,
  UserCreatedFailEvent
} from "../events/impl/user-created.event";
import { UserUpdatedEvent } from "../events/impl/user-updated.event";
import { UserDeletedEvent } from "../events/impl/user-deleted.event";
import { UserWelcomedEvent } from "../events/impl/user-welcomed.event";
import { UserDto } from "users/dtos/users.dto";
import { AssignedRoleEvent } from "users/events/impl/role-assigned.event";
import { Logger } from "@nestjs/common";

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

  deleteUser(transactionId: string) {
    this.apply(new UserDeletedEvent(transactionId, this.id));
  }

  assignRoleUser(userId, roleName) {
    try {
      this.apply(new AssignedRoleEvent(userId, roleName));
    } catch (e) {
      Logger.error(e, '', '[UserModel] assignRoleUser');
    }
  }
}
