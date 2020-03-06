import { AggregateRoot } from "@nestjs/cqrs";
import { TokenCreatedEvent, TokenCreatedFailEvent } from "../events/impl/token-created.event";
import { TokenUpdatedEvent } from "../events/impl/token-updated.event";
import { TokenDeletedEvent } from "../events/impl/token-deleted.event";
import { TokenWelcomedEvent } from "../events/impl/token-welcomed.event";
import { TokenDto } from "tokens/dtos/tokens.dto";
import { Logger } from "@nestjs/common";

export class Token extends AggregateRoot {
  [x: string]: any;

  constructor(private readonly id: string | undefined) {
    super();
  }

  setData(data) {
    this.data = data;
  }

  createToken(transactionId) {
    try {
      this.apply(new TokenCreatedEvent(transactionId, this.data));
      // this.apply(new TokenCreatedFailEvent(transactionId, this.data, {message: "invalid!"}));
    } catch (error) {
      this.apply(new TokenCreatedFailEvent(transactionId, this.data, error));
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
