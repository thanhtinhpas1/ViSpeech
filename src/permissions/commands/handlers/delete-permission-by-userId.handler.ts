import {CommandHandler, EventPublisher, ICommandHandler} from '@nestjs/cqrs';
import {PermissionRepository} from '../../repository/permission.repository';
import {Logger} from '@nestjs/common';
import { DeletePermissionByUserIdCommand } from '../impl/delete-permission-by-userId.command';

@CommandHandler(DeletePermissionByUserIdCommand)
export class DeletePermissionByUserIdHandler implements ICommandHandler<DeletePermissionByUserIdCommand> {
    constructor(
        private readonly repository: PermissionRepository,
        private readonly publisher: EventPublisher
    ) {
    }

    async execute(command: DeletePermissionByUserIdCommand) {
        Logger.log('Async DeletePermissionByUserIdHandler...', 'DeletePermissionByUserIdCommand');
        const {streamId, userId} = command;
        const permission = this.publisher.mergeObjectContext(
            await this.repository.deletePermissionByUserId(streamId, userId)
        );
        permission.commit();
    }
}
