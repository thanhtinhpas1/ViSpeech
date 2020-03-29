import { EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { WelcomeTokenCommand } from '../impl/welcome-token.command';
import { TokenRepository } from '../../repository/token.repository';
export declare class WelcomeTokenHandler implements ICommandHandler<WelcomeTokenCommand> {
    private readonly repository;
    private readonly publisher;
    constructor(repository: TokenRepository, publisher: EventPublisher);
    execute(command: WelcomeTokenCommand): Promise<void>;
}
