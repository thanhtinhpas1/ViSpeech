import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import {
  CreateTokenCommand
} from "../impl/create-token.command";
import { TokenRepository } from "../../repository/token.repository";
import { Logger } from "@nestjs/common";

@CommandHandler(CreateTokenCommand)
export class CreateTokenHandler
  implements ICommandHandler<CreateTokenCommand> {
  constructor(
    private readonly repository: TokenRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateTokenCommand) {
    Logger.log("Async CreateTokenHandler...", "CreateTokenCommand");

    const { transactionId, tokenDto } = command;
    // use mergeObjectContext for dto dispatch events
    const token = this.publisher.mergeObjectContext(
      await this.repository.createToken(transactionId, tokenDto)
    );
    token.commit();
  }
}
