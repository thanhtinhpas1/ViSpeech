import { AggregateRoot } from "@nestjs/cqrs";
import { TokenCreatedEvent } from "../events/impl/token-created.event";
import { TokenUpdatedEvent } from "../events/impl/token-updated.event";
import { TokenDeletedEvent } from "../events/impl/token-deleted.event";
import { TokenWelcomedEvent } from "../events/impl/token-welcomed.event";
import { FreeTokenCreatedEvent } from "tokens/events/impl/free-token-created.event";
import { OrderedTokenCreatedEvent } from "tokens/events/impl/ordered-token-created";

export class Token extends AggregateRoot {
  [x: string]: any;

  constructor(private readonly id: string | undefined) {
    super();
  }

  setData(data) {
    this.data = data;
  }

  createToken(transactionId: string) {
    this.apply(new TokenCreatedEvent(transactionId, this.data));
  }

  createFreeToken(transactionId: string) {
    this.apply(new FreeTokenCreatedEvent(transactionId, this.data));
  }

  createOrderedToken(transactionId: string) {
    this.apply(new OrderedTokenCreatedEvent(transactionId, this.data));
  }

  updateToken() {
    this.apply(new TokenUpdatedEvent(this.data));
  }

  welcomeToken() {
    this.apply(new TokenWelcomedEvent(this.id));
  }

  deleteToken(transactionId: string) {
    this.apply(new TokenDeletedEvent(transactionId, this.id));
  }
}
