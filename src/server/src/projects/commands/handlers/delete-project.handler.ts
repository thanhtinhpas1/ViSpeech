import { CommandHandler, EventBus, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { DeleteProjectCommand } from '../impl/delete-project.command';
import { ProjectRepository } from '../../repository/project.repository';
import { Logger, NotFoundException } from '@nestjs/common';
import { getMongoRepository } from 'typeorm';
import { ProjectDto } from 'projects/dtos/projects.dto';
import { ProjectDeletedFailedEvent } from 'projects/events/impl/project-deleted.event';

@CommandHandler(DeleteProjectCommand)
export class DeleteProjectHandler implements ICommandHandler<DeleteProjectCommand> {
    constructor(
        private readonly repository: ProjectRepository,
        private readonly publisher: EventPublisher,
        private readonly eventBus: EventBus
    ) {
    }

    async execute(command: DeleteProjectCommand) {
        Logger.log('Async DeleteProjectHandler...', 'DeleteProjectCommand');
        const { streamId, projectIdDto } = command;
        const projectId = projectIdDto._id;

        try {
            const project = await getMongoRepository(ProjectDto).findOne({ _id: projectId });
            if (!project) {
                throw new NotFoundException(`Project with _id ${projectId} does not exist.`);
            }

            // use mergeObjectContext for dto dispatch events
            const projectModel = this.publisher.mergeObjectContext(
                await this.repository.deleteProject(streamId, projectId)
            );
            projectModel.commit();
        } catch (error) {
            this.eventBus.publish(new ProjectDeletedFailedEvent(streamId, projectId, error));
        }
    }
}
