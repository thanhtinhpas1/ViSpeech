import {CommandHandler, EventPublisher, ICommandHandler} from '@nestjs/cqrs';
import {WelcomeTokenCommand} from '../impl/welcome-token.command';
import {TokenRepository} from '../../repository/token.repository';
import {Logger} from '@nestjs/common';

@CommandHandler(WelcomeTokenCommand)
export class WelcomeTokenHandler
  implements ICommandHandler<WelcomeTokenCommand> {
  constructor(
    private readonly repository: TokenRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: WelcomeTokenCommand) {
    Logger.log("Async WelcomeTokenHandler...", "WelcomeTokenCommand");
    const { tokenId } = command;
    const token = this.publisher.mergeObjectContext(
      await this.repository.welcomeToken(tokenId)
    );
    token.commit();
  }
}
