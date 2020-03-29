import { EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateProjectCommand } from '../impl/create-project.command';
import { ProjectRepository } from '../../repository/project.repository';
export declare class CreateProjectHandler implements ICommandHandler<CreateProjectCommand> {
    private readonly repository;
    private readonly publisher;
    constructor(repository: ProjectRepository, publisher: EventPublisher);
    execute(command: CreateProjectCommand): Promise<void>;
}
