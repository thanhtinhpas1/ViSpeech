import {CommandHandler, EventPublisher, ICommandHandler} from '@nestjs/cqrs';
import {ProjectRepository} from '../../repository/project.repository';
import {Logger} from '@nestjs/common';
import { DeleteProjectByUserIdCommand } from '../impl/delete-project-by-userId.command';

@CommandHandler(DeleteProjectByUserIdCommand)
export class DeleteProjectByUserIdHandler implements ICommandHandler<DeleteProjectByUserIdCommand> {
    constructor(
        private readonly repository: ProjectRepository,
        private readonly publisher: EventPublisher
    ) {
    }

    async execute(command: DeleteProjectByUserIdCommand) {
        Logger.log('Async DeleteProjectByUserIdHandler...', 'DeleteProjectByUserIdCommand');
        const {streamId, userId} = command;
        const project = this.publisher.mergeObjectContext(
            await this.repository.deleteProjectByUserId(streamId, userId)
        );
        project.commit();
    }
}
