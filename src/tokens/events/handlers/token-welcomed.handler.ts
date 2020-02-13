import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { TokenWelcomedEvent } from '../impl/token-welcomed.event';
import { Logger } from '@nestjs/common';

@EventsHandler(TokenWelcomedEvent)
export class TokenWelcomedHandler
  implements IEventHandler<TokenWelcomedEvent> {
  handle(event: TokenWelcomedEvent) {
    Logger.log(event, 'TokenWelcomedEvent'); // write here
  }
}
