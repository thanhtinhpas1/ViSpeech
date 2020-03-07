import { AggregateRoot } from "@nestjs/cqrs";
import { TokenCreatedEvent, TokenCreatedFailEvent } from "../events/impl/token-created.event";
import { TokenDeletedEvent } from "../events/impl/token-deleted.event";
import { TokenUpdatedEvent } from "../events/impl/token-updated.event";
import { TokenWelcomedEvent } from "../events/impl/token-welcomed.event";

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
