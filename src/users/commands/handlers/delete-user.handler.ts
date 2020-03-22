import {CommandHandler, EventPublisher, ICommandHandler} from '@nestjs/cqrs';
import {DeleteUserCommand} from '../impl/delete-user.command';
import {UserRepository} from '../../repository/user.repository';
import {Logger} from '@nestjs/common';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(
    private readonly repository: UserRepository,
    private readonly publisher: EventPublisher
  ) { }

  async execute(command: DeleteUserCommand) {
    Logger.log("Async DeleteUserHandler...", "DeleteUserCommand");

    const { streamId, userIdDto } = command;
    const user = this.publisher.mergeObjectContext(
      await this.repository.deleteUser(streamId, userIdDto._id)
    );
    user.commit();
  }
}
