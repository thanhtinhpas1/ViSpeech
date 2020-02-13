import { EventPublisher, ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { DeleteTokenCommand } from '../impl/delete-token.command';
import { TokenRepository } from '../../repository/token.repository';
import { Logger } from '@nestjs/common';

@CommandHandler(DeleteTokenCommand)
export class DeleteTokenHandler
  implements ICommandHandler<DeleteTokenCommand> {
  constructor(
    private readonly repository: TokenRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: DeleteTokenCommand) {
    Logger.log('Async DeleteTokenHandler...', 'DeleteTokenCommand');
    const {tokenDto} = command;
    const token = this.publisher.mergeObjectContext(
      await this.repository.deleteToken(tokenDto),
    );
    token.commit();
  }
}
