import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { CreateUserCommand, CreateUserStartCommand } from "../impl/create-user.command";
import { UserRepository } from "../../repository/user.repository";
import { Logger } from "@nestjs/common";

@CommandHandler(CreateUserStartCommand)
export class CreateUserStartHandler
  implements ICommandHandler<CreateUserStartCommand> {
  constructor(
    private readonly repository: UserRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateUserStartCommand) {
    Logger.log("Async CreateUserStartHandler...", "CreateUserStartCommand");

    const { transactionId, userDto } = command;
    // use mergeObjectContext for dto dispatch events
    const user = this.publisher.mergeObjectContext(
      await this.repository.createUserStart(transactionId, userDto)
    );
    user.commit();
  }
}

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly repository: UserRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateUserCommand) {
    Logger.log("Async CreateUserHandler...", "CreateUserCommand");

    const { transactionId, userDto } = command;
    // use mergeObjectContext for dto dispatch events
    const user = this.publisher.mergeObjectContext(
      await this.repository.createUser(transactionId, userDto)
    );
    user.commit();
  }
}
