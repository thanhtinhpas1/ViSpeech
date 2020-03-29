import { EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UpdateProjectCommand } from '../impl/update-project.command';
import { ProjectRepository } from '../../repository/project.repository';
export declare class UpdateProjectHandler implements ICommandHandler<UpdateProjectCommand> {
    private readonly repository;
    private readonly publisher;
    constructor(repository: ProjectRepository, publisher: EventPublisher);
    execute(command: UpdateProjectCommand): Promise<void>;
}
