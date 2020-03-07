import { Logger } from "@nestjs/common";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { TokenRepository } from "../../repository/token.repository";
import { CreateTokenCommand } from "../impl/create-token.command";

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
