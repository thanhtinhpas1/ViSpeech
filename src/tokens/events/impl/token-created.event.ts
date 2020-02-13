import { IEvent } from '@nestjs/cqrs';
import { Token } from 'tokens/models/token.model';

export class TokenCreatedEvent implements IEvent {
  constructor(
    public readonly token: Token) {}
}
