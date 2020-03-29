import { EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { DeleteTokenByUserIdCommand, DeleteTokenCommand } from '../impl/delete-token.command';
import { TokenRepository } from '../../repository/token.repository';
export declare class DeleteTokenHandler implements ICommandHandler<DeleteTokenCommand> {
    private readonly repository;
    private readonly publisher;
    constructor(repository: TokenRepository, publisher: EventPublisher);
    execute(command: DeleteTokenCommand): Promise<void>;
}
export declare class DeleteTokenByUserIdHandler implements ICommandHandler<DeleteTokenByUserIdCommand> {
    private readonly repository;
    private readonly publisher;
    constructor(repository: TokenRepository, publisher: EventPublisher);
    execute(command: DeleteTokenByUserIdCommand): Promise<void>;
}
