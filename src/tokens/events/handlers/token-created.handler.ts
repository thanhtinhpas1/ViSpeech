import { EventsHandler, IEventHandler, EventBus } from '@nestjs/cqrs';
import { TokenCreatedEvent, TokenCreatedFailEvent, TokenCreatedSuccessEvent } from '../impl/token-created.event';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenTypeDto } from 'tokens/dtos/token-types.dto';
import { TokenDto } from 'tokens/dtos/tokens.dto';
import { Repository } from 'typeorm';

@EventsHandler(TokenCreatedEvent)
export class TokenCreatedHandler implements IEventHandler<TokenCreatedEvent> {
  constructor(
    @InjectRepository(TokenDto)
    private readonly repository: Repository<TokenDto>,
    @InjectRepository(TokenTypeDto)
    private readonly repositoryTokenType: Repository<TokenTypeDto>,
    private readonly eventBus: EventBus,
  ) {}

  async handle(event: TokenCreatedEvent) {
    const {userId, tokenDto} = event;
    let tokenTypeDto = null;
    try {
      if (tokenDto.tokenTypeId) {
        tokenTypeDto = await this.repositoryTokenType.findOne({
          _id: tokenDto.tokenTypeId,
        });
      } else {
        tokenTypeDto = await this.repositoryTokenType.findOne({
          name: tokenDto.tokenType,
        });
      }
      tokenDto.tokenTypeId = tokenTypeDto._id;
      tokenDto.minutes = tokenTypeDto.minutes;
      tokenDto.userId = userId;
      delete tokenDto.tokenType;
      delete tokenDto.orderId;
      Logger.log(event, 'TokenCreatedEvent');
      const newToken = await this.repository.save(tokenDto);
      this.eventBus.publish(new TokenCreatedSuccessEvent(userId, newToken));
    } catch (error) {
      Logger.error(error.message, '', 'TokenCreatedHandler');
      this.eventBus.publish(new TokenCreatedFailEvent(userId, tokenDto, error));
    }
  }
}

@EventsHandler(TokenCreatedSuccessEvent)
export class TokenCreatedSuccessHandler
  implements IEventHandler<TokenCreatedSuccessEvent> {
  handle(event: TokenCreatedSuccessEvent) {
    Logger.log(event, 'TokenCreatedSuccessEvent');
  }
}

@EventsHandler(TokenCreatedFailEvent)
export class TokenCreatedFailHandler
  implements IEventHandler<TokenCreatedFailEvent> {
  handle(event: TokenCreatedFailEvent) {
    Logger.log(event.userId, 'TokenCreatedFailEvent');
  }
}
