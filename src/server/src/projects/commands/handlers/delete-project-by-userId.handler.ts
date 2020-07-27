import { CommandHandler, EventBus, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { ProjectRepository } from '../../repository/project.repository';
import { Logger, NotFoundException } from '@nestjs/common';
import { DeleteProjectByUserIdCommand } from '../impl/delete-project-by-userId.command';
import { getMongoRepository } from 'typeorm';
import { ProjectDto } from 'projects/dtos/projects.dto';
import { ProjectDeletedByUserIdFailedEvent } from 'projects/events/impl/project-deleted-by-userId.event';

@CommandHandler(DeleteProjectByUserIdCommand)
export class DeleteProjectByUserIdHandler implements ICommandHandler<DeleteProjectByUserIdCommand> {
    constructor(
        private readonly repository: ProjectRepository,
        private readonly publisher: EventPublisher,
        private readonly eventBus: EventBus
    ) {
    }

    async execute(command: DeleteProjectByUserIdCommand) {
        Logger.log('Async DeleteProjectByUserIdHandler...', 'DeleteProjectByUserIdCommand');
        const { streamId, userId } = command;

        try {
            const project = await getMongoRepository(ProjectDto).find({ userId });
            if (!project) {
                throw new NotFoundException(`Project with userId ${userId} does not exist.`);
            }

            // use mergeObjectContext for dto dispatch events
            const projectModel = this.publisher.mergeObjectContext(
                await this.repository.deleteProjectByUserId(streamId, userId)
            );
            projectModel.commit();
        } catch (error) {
            this.eventBus.publish(new ProjectDeletedByUserIdFailedEvent(streamId, userId, error));
        }
    }
}
