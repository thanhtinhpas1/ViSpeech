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

export class User extends AggregateRoot {
  [x: string]: any;

  constructor(private readonly id: string | undefined) {
    super();
  }

  setData(data: UserDto) {
    this.data = data;
  }

  createUserStart(transactionId) {
    this.apply(new UserCreationStartedEvent(transactionId, this.data));
  }

  createUser(transactionId) {
    try {
      this.apply(new UserCreatedEvent(transactionId, this.data));
    } catch (error) {
      this.apply(new UserCreatedFailEvent(transactionId, error));
    }
  }

  updateUser() {
    this.apply(new UserUpdatedEvent(this.data));
  }

  welcomeUser() {
    this.apply(new UserWelcomedEvent(this.id));
  }

  deleteUser(transactionId) {
    this.apply(new UserDeletedEvent(transactionId, this.id));
    // try {
    // } catch (error) {
    //   Logger.error(error, "", "[UserModel] deleteUser");
    // }
  }
}
