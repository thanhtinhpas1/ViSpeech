import {CommandHandler, EventPublisher, ICommandHandler} from '@nestjs/cqrs';
import {PermissionRepository} from '../../repository/permission.repository';
import {Logger} from '@nestjs/common';
import { DeletePermissionByProjectIdCommand } from '../impl/delete-permission-by-projectId.command copy';

@CommandHandler(DeletePermissionByProjectIdCommand)
export class DeletePermissionByProjectIdHandler implements ICommandHandler<DeletePermissionByProjectIdCommand> {
    constructor(
        private readonly repository: PermissionRepository,
        private readonly publisher: EventPublisher
    ) {
    }

    async execute(command: DeletePermissionByProjectIdCommand) {
        Logger.log('Async DeletePermissionByProjectIdHandler...', 'DeletePermissionByProjectIdCommand');
        const {streamId, projectId} = command;
        const permission = this.publisher.mergeObjectContext(
            await this.repository.deletePermissionByProjectId(streamId, projectId)
        );
        permission.commit();
    }
}
