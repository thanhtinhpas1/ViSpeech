import { AggregateRoot } from "@nestjs/cqrs";
import { TokenCreatedEvent } from "../events/impl/token-created.event";
import { TokenUpdatedEvent } from "../events/impl/token-updated.event";
import { TokenDeletedEvent } from "../events/impl/token-deleted.event";
import { TokenWelcomedEvent } from "../events/impl/token-welcomed.event";
import {
  UserTokenCreatedEvent,
  UserTokenCreatedFailEvent
} from "users/events/impl/user-created.event";
import { TokenDto } from "tokens/dtos/tokens.dto";

export class Token extends AggregateRoot {
  [x: string]: any;

  constructor(private readonly id: string | undefined) {
    super();
  }

  setData(data: TokenDto) {
    this.data = data;
  }

  createToken() {
    this.apply(new TokenCreatedEvent(this.data));
  }

  createUserToken(transactionId) {
    // if (transactionId === "1") {
    //   this.apply(new TokenCreatedEvent(this.data));
    //   this.apply(new UserTokenCreatedEvent(transactionId, this.data));
    // } else {
      // this.apply(
      //   new UserTokenCreatedFailEvent(transactionId, {
      //     message: "invalid transactionId!"
      //   })
      // );
    // }
    try {
      // this.apply(new TokenCreatedEvent(this.data));
      // this.apply(new UserTokenCreatedEvent(transactionId, this.data));
      this.apply(new UserTokenCreatedFailEvent(transactionId, {message: "invalid!"}));
    } catch (error) {
      this.apply(new UserTokenCreatedFailEvent(transactionId, error));
    }
  }

  updateToken() {
    this.apply(new TokenUpdatedEvent(this.data));
  }

  welcomeToken() {
    this.apply(new TokenWelcomedEvent(this.id));
  }

  deleteToken() {
    this.apply(new TokenDeletedEvent(this.id));
  }
}
