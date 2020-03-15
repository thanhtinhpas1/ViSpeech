import { EventsHandler, IEventHandler, EventBus } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenDto } from 'tokens/dtos/tokens.dto';
import { Repository } from 'typeorm';
import { TokenTypeDto } from 'tokens/dtos/token-types.dto';
import { OrderedTokenCreatedEvent, OrderedTokenCreatedSuccessEvent, OrderedTokenCreatedFailEvent } from '../impl/ordered-token-created';

@EventsHandler(OrderedTokenCreatedEvent)
export class OrderedTokenCreatedHandler implements IEventHandler<OrderedTokenCreatedEvent> {
  constructor(
    @InjectRepository(TokenDto)
    private readonly repository: Repository<TokenDto>,
    @InjectRepository(TokenTypeDto)
    private readonly repositoryTokenType: Repository<TokenTypeDto>,
    private readonly eventBus: EventBus,
  ) {}

  async handle(event: OrderedTokenCreatedEvent) {
    Logger.log(event, 'OrderedTokenCreatedEvent');
    const token = JSON.parse(JSON.stringify(event.tokenDto));
    const transactionId = event.transactionId;
    let tokenTypeDto = null;
    try {
      if (token.tokenTypeId) {
        tokenTypeDto = await this.repositoryTokenType.find({
          _id: token.tokenTypeId,
        });
      } else {
        tokenTypeDto = await this.repositoryTokenType.find({
          name: token.tokenType,
        });
      }
      token.tokenTypeId = tokenTypeDto[0]._id;
      token.minutes = tokenTypeDto[0].minutes;
      token.transactionId = transactionId;
      delete token.tokenType;
      delete token.orderId;
      const newToken = await this.repository.save(token);
      this.eventBus.publish(new OrderedTokenCreatedSuccessEvent(transactionId, newToken));
    } catch (error) {
      this.eventBus.publish(new OrderedTokenCreatedFailEvent(transactionId, token, error));
    }
  }
}

@EventsHandler(OrderedTokenCreatedSuccessEvent)
export class OrderedTokenCreatedSuccessHandler
  implements IEventHandler<OrderedTokenCreatedSuccessEvent> {
  handle(event: OrderedTokenCreatedSuccessEvent) {
    Logger.log(event, 'OrderedTokenCreatedSuccessEvent');
  }
}

@EventsHandler(OrderedTokenCreatedFailEvent)
export class OrderedTokenCreatedFailHandler
  implements IEventHandler<OrderedTokenCreatedFailEvent> {
  handle(event: OrderedTokenCreatedFailEvent) {
    Logger.log(event, 'OrderedTokenCreatedFailEvent');
  }
}
