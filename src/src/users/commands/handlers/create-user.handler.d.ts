import { EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UserRepository } from '../../repository/user.repository';
import { CreateUserCommand, CreateUserStartCommand } from '../impl/create-user.command';
export declare class CreateUserStartHandler implements ICommandHandler<CreateUserStartCommand> {
    private readonly repository;
    private readonly publisher;
    constructor(repository: UserRepository, publisher: EventPublisher);
    execute(command: CreateUserStartCommand): Promise<void>;
}
export declare class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
    private readonly repository;
    private readonly publisher;
    constructor(repository: UserRepository, publisher: EventPublisher);
    execute(command: CreateUserCommand): Promise<void>;
}
