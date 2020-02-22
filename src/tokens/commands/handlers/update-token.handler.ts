import {CommandHandler, EventPublisher, ICommandHandler} from '@nestjs/cqrs';
import {UpdateTokenCommand} from '../impl/update-token.command';
import {TokenRepository} from '../../repository/token.repository';
import {Logger} from '@nestjs/common';

@CommandHandler(UpdateTokenCommand)
export class UpdateTokenHandler implements ICommandHandler<UpdateTokenCommand> {
  constructor(
    private readonly repository: TokenRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateTokenCommand) {
    Logger.log("Async UpdateTokenHandler...", "UpdateTokenCommand");

    const { tokenDto } = command;
    const token = this.publisher.mergeObjectContext(
      await this.repository.updateToken(tokenDto)
    );
    token.commit();
  }
}
