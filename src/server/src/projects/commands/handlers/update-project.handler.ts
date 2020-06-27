import { CommandHandler, EventBus, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UpdateProjectCommand } from '../impl/update-project.command';
import { ProjectRepository } from '../../repository/project.repository';
import { Logger, NotFoundException } from '@nestjs/common';
import { getMongoRepository } from 'typeorm';
import { ProjectDto } from 'projects/dtos/projects.dto';
import { ProjectUpdatedFailedEvent } from 'projects/events/impl/project-updated.event';

@CommandHandler(UpdateProjectCommand)
export class UpdateProjectHandler implements ICommandHandler<UpdateProjectCommand> {
    constructor(
        private readonly repository: ProjectRepository,
        private readonly publisher: EventPublisher,
        private readonly eventBus: EventBus
    ) {
    }

    async execute(command: UpdateProjectCommand) {
        Logger.log('Async UpdateProjectHandler...', 'UpdateProjectCommand');
        const {streamId, projectDto} = command;

        try {
            const project = await getMongoRepository(ProjectDto).findOne({_id: projectDto._id});
            if (!project) {
                throw new NotFoundException(`Project with _id ${projectDto._id} does not exist.`);
            }

            // use mergeObjectContext for dto dispatch events
            const projectModel = this.publisher.mergeObjectContext(
                await this.repository.updateProject(streamId, projectDto)
            );
            projectModel.commit();
        } catch (error) {
            this.eventBus.publish(new ProjectUpdatedFailedEvent(streamId, projectDto, error));
        }
    }
}
