import { Logger } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { TokenWelcomedEvent } from "../impl/token-welcomed.event";

@EventsHandler(TokenWelcomedEvent)
export class TokenWelcomedHandler implements IEventHandler<TokenWelcomedEvent> {
  handle(event: TokenWelcomedEvent) {
    Logger.log(event.tokenId, "TokenWelcomedEvent"); // write here
  }
}
