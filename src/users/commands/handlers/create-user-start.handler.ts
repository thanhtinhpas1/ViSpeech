import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { UserRepository } from "../../repository/user.repository";
import { Logger } from "@nestjs/common";
import { CreateUserStartCommand } from "../impl/create-user-start.command";

@CommandHandler(CreateUserStartCommand)
export class CreateUserStartHandler
  implements ICommandHandler<CreateUserStartCommand> {
  constructor(
    private readonly repository: UserRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateUserStartCommand) {
    Logger.log("Async CreateUserStartHandler...", "CreateUserStartCommand");

    const { userDto } = command;
    // use mergeObjectContext for dto dispatch events
    const user = this.publisher.mergeObjectContext(
      await this.repository.createUserStart(userDto)
    );
    user.commit();
  }
}
