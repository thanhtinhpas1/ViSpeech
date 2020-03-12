import { Logger } from "@nestjs/common";
import { AggregateRoot } from "@nestjs/cqrs";
import { UserRoleAssignedEvent } from "users/events/impl/user-role-assigned.event";
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

  updateUser(transactionId: string, updatedBy: string, roleNames: string[]) {
    this.apply(new UserUpdatedEvent(transactionId, updatedBy, roleNames, this.data));
  }

  deleteUser(transactionId: string, updatedBy: string, roles: string[]) {
    this.apply(new UserDeletedEvent(transactionId, updatedBy, roles, this.id));
  }
  
  welcomeUser(transactionId: string) {
    this.apply(new UserWelcomedEvent(transactionId, this.id));
  }

  assignUserRole(transactionId: string, userId: string, roleNames: string[], assignerId: string) {
    try {
      this.apply(new UserRoleAssignedEvent(transactionId, userId, roleNames, assignerId));
    } catch (e) {
      Logger.error(e, '', '[UserModel] assignUserRole');
    }
  }
}
