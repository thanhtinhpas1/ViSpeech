import { Logger } from "@nestjs/common";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import {
  CreateTokenCommand, CreateFreeTokenCommand, CreateOrderedTokenCommand
} from "../impl/create-token.command";
import { TokenRepository } from "../../repository/token.repository";

@CommandHandler(CreateTokenCommand)
export class CreateTokenHandler
  implements ICommandHandler<CreateTokenCommand> {
  constructor(
    private readonly repository: TokenRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateTokenCommand) {
    Logger.log("Async CreateTokenHandler...", "CreateTokenCommand");

    const { tokenDto } = command;
    // use mergeObjectContext for dto dispatch events
    const token = this.publisher.mergeObjectContext(
      await this.repository.createToken(tokenDto)
    );
    token.commit();
  }
}

@CommandHandler(CreateFreeTokenCommand)
export class CreateFreeTokenHandler
  implements ICommandHandler<CreateFreeTokenCommand> {
  constructor(
    private readonly repository: TokenRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateFreeTokenCommand) {
    Logger.log("Async CreateFreeTokenHandler...", "CreateFreeTokenCommand");

    const { tokenDto } = command;
    // use mergeObjectContext for dto dispatch events
    const token = this.publisher.mergeObjectContext(
      await this.repository.createFreeToken(tokenDto)
    );
    token.commit();
  }
}

@CommandHandler(CreateOrderedTokenCommand)
export class CreateOrderedTokenHandler
  implements ICommandHandler<CreateOrderedTokenCommand> {
  constructor(
    private readonly repository: TokenRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateOrderedTokenCommand) {
    Logger.log("Async CreateOrderedTokenHandler...", "CreateOrderedTokenCommand");

    const { tokenDto } = command;
    // use mergeObjectContext for dto dispatch events
    const token = this.publisher.mergeObjectContext(
      await this.repository.createOrderedToken(tokenDto)
    );
    token.commit();
  }
}
