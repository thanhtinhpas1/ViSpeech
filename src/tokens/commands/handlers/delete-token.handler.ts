import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { DeleteTokenCommand, DeleteTokenByUserIdCommand } from "../impl/delete-token.command";
import { TokenRepository } from "../../repository/token.repository";
import { Logger } from "@nestjs/common";

@CommandHandler(DeleteTokenCommand)
export class DeleteTokenHandler implements ICommandHandler<DeleteTokenCommand> {
  constructor(
    private readonly repository: TokenRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: DeleteTokenCommand) {
    Logger.log("Async DeleteTokenHandler...", "DeleteTokenCommand");
    const { streamId, tokenIdDto } = command;
    const token = this.publisher.mergeObjectContext(
      await this.repository.deleteToken(streamId, tokenIdDto._id)
    );
    token.commit();
  }
}

@CommandHandler(DeleteTokenByUserIdCommand)
export class DeleteTokenByUserIdHandler implements ICommandHandler<DeleteTokenByUserIdCommand> {
  constructor(
    private readonly repository: TokenRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: DeleteTokenByUserIdCommand) {
    Logger.log("Async DeleteTokenByUserIdHandler...", "DeleteTokenByUserIdCommand");
    const { streamId, userId } = command;
    const token = this.publisher.mergeObjectContext(
      await this.repository.deleteTokenByUserId(streamId, userId)
    );
    token.commit();
  }
}
