import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { DeleteTokenCommand } from "../impl/delete-token.command";
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
    const { tokenIdDto } = command;
    const id = tokenIdDto._id;
    const token = this.publisher.mergeObjectContext(
      await this.repository.deleteToken(id)
    );
    token.commit();
  }
}
