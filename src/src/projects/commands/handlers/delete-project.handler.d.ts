import { EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { DeleteProjectCommand } from '../impl/delete-project.command';
import { ProjectRepository } from '../../repository/project.repository';
export declare class DeleteProjectHandler implements ICommandHandler<DeleteProjectCommand> {
    private readonly repository;
    private readonly publisher;
    constructor(repository: ProjectRepository, publisher: EventPublisher);
    execute(command: DeleteProjectCommand): Promise<void>;
}
