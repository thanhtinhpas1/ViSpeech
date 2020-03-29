import { EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { WelcomeProjectCommand } from '../impl/welcome-project.command';
import { ProjectRepository } from '../../repository/project.repository';
export declare class WelcomeProjectHandler implements ICommandHandler<WelcomeProjectCommand> {
    private readonly repository;
    private readonly publisher;
    constructor(repository: ProjectRepository, publisher: EventPublisher);
    execute(command: WelcomeProjectCommand): Promise<void>;
}
