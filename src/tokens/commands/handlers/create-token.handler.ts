import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { CreateTokenCommand, CreateUserTokenCommand } from "../impl/create-token.command";
import { TokenRepository } from "../../repository/token.repository";
import { Logger } from "@nestjs/common";

@CommandHandler(CreateTokenCommand)
export class CreateTokenHandler implements ICommandHandler<CreateTokenCommand> {
    constructor(
        private readonly repository: TokenRepository,
        private readonly publisher: EventPublisher
    ) {
    }

    async execute(command: CreateTokenCommand) {
        Logger.log('Async CreateTokenHandler...', 'CreateTokenCommand');

    const { tokenDto } = command;
    // use mergeObjectContext for dto dispatch events
    const token = this.publisher.mergeObjectContext(
      await this.repository.createToken(tokenDto)
    );
    token.commit();
  }
}

@CommandHandler(CreateUserTokenCommand)
export class CreateUserTokenHandler implements ICommandHandler<CreateUserTokenCommand> {
    constructor(
        private readonly repository: TokenRepository,
        private readonly publisher: EventPublisher
    ) {
    }

    async execute(command: CreateUserTokenCommand) {
        Logger.log('Async CreateUserTokenHandler...', 'CreateUserTokenCommand');

    const { transactionId, tokenDto } = command;
    // use mergeObjectContext for dto dispatch events
    const token = this.publisher.mergeObjectContext(
      await this.repository.createUserToken(transactionId, tokenDto)
    );
    token.commit();
  }
}
