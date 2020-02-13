import { AggregateRoot } from '@nestjs/cqrs';
import { TokenCreatedEvent } from '../events/impl/token-created.event';
import { TokenUpdatedEvent } from '../events/impl/token-updated.event';
import { TokenDeletedEvent } from '../events/impl/token-deleted.event';
import { TokenWelcomedEvent } from '../events/impl/token-welcomed.event';
import { Logger } from '@nestjs/common';

export class Token extends AggregateRoot {
  [x: string]: any;

  constructor(private readonly id: string | undefined) {
    super();
  }

  setData(data) {
    this.data = data;
  }

  createToken() {
    Logger.log(this.data, 'CreateTokenModel')
    this.apply(new TokenCreatedEvent(this.data));
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
