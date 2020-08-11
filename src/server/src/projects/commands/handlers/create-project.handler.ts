import { Logger, BadRequestException } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CreateProjectCommand } from '../impl/create-project.command';
import { ProjectRepository } from '../../repository/project.repository';
import { getMongoRepository } from 'typeorm';
import { ProjectDto } from 'projects/dtos/projects.dto';
import { ProjectCreatedFailedEvent } from 'projects/events/impl/project-created.event';

@CommandHandler(CreateProjectCommand)
export class CreateProjectHandler
    implements ICommandHandler<CreateProjectCommand> {
    constructor(
        private readonly repository: ProjectRepository,
        private readonly publisher: EventPublisher,
        private readonly eventBus: EventBus
    ) {
    }

    async execute(command: CreateProjectCommand) {
        Logger.log('Async CreateProjectHandler...', 'CreateProjectCommand');
        const { streamId, projectDto } = command;

        try {
            const projects = await getMongoRepository(ProjectDto).find({ name: projectDto.name });
            if (projects.length > 0) {
                throw new BadRequestException('Project name is existed.');
            }

            // use mergeObjectContext for dto dispatch events
            const project = this.publisher.mergeObjectContext(
                await this.repository.createProject(streamId, projectDto)
            );
            project.commit();
        } catch (error) {
            this.eventBus.publish(new ProjectCreatedFailedEvent(streamId, projectDto, error));
        }
    }
}
