import { Logger } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { TokenDto } from "tokens/dtos/tokens.dto";
import { TokenDeletedEvent } from "../impl/token-deleted.event";
import { Repository, getMongoRepository } from "typeorm";

@EventsHandler(TokenDeletedEvent)
export class TokenDeletedHandler implements IEventHandler<TokenDeletedEvent> {
  constructor(
    @InjectRepository(TokenDto)
    private readonly repository: Repository<TokenDto>
  ) {}

  async handle(event: TokenDeletedEvent) {
    Logger.log(event, "TokenDeletedEvent");
    const tokenId = event.tokenId;
    const transactionId = event.transactionId;
    try {
      if (tokenId) {
        await this.repository.delete({ _id: tokenId });
        return;
      }
      await getMongoRepository(TokenDto).deleteOne({
        transactionId: transactionId
      });
    } catch (error) {
      Logger.error(error, "", "TokenDeletedEvent");
    }
  }
}
