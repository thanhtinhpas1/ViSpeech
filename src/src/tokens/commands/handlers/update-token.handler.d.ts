import { EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UpdateTokenCommand } from '../impl/update-token.command';
import { TokenRepository } from '../../repository/token.repository';
export declare class UpdateTokenHandler implements ICommandHandler<UpdateTokenCommand> {
    private readonly repository;
    private readonly publisher;
    constructor(repository: TokenRepository, publisher: EventPublisher);
    execute(command: UpdateTokenCommand): Promise<void>;
}
