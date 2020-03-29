import { EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateFreeTokenCommand, CreateOrderedTokenCommand, CreateTokenCommand } from '../impl/create-token.command';
import { TokenRepository } from '../../repository/token.repository';
export declare class CreateTokenHandler implements ICommandHandler<CreateTokenCommand> {
    private readonly repository;
    private readonly publisher;
    constructor(repository: TokenRepository, publisher: EventPublisher);
    execute(command: CreateTokenCommand): Promise<void>;
}
export declare class CreateFreeTokenHandler implements ICommandHandler<CreateFreeTokenCommand> {
    private readonly repository;
    private readonly publisher;
    constructor(repository: TokenRepository, publisher: EventPublisher);
    execute(command: CreateFreeTokenCommand): Promise<void>;
}
export declare class CreateOrderedTokenHandler implements ICommandHandler<CreateOrderedTokenCommand> {
    private readonly repository;
    private readonly publisher;
    constructor(repository: TokenRepository, publisher: EventPublisher);
    execute(command: CreateOrderedTokenCommand): Promise<void>;
}
