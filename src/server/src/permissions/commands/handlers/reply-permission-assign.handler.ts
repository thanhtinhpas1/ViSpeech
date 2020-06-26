import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { PermissionRepository } from '../../repository/permission.repository';
import { Logger } from '@nestjs/common';
import { ReplyPermissionAssignCommand } from '../impl/reply-permission-assign.command';

@CommandHandler(ReplyPermissionAssignCommand)
export class ReplyPermissionAssignHandler implements ICommandHandler<ReplyPermissionAssignCommand> {
    constructor(
        private readonly repository: PermissionRepository,
        private readonly publisher: EventPublisher
    ) {
    }

    async execute(command: ReplyPermissionAssignCommand) {
        Logger.log('Async ReplyPermissionAssignHandler...', 'ReplyPermissionAssignCommand');

        const {streamId, permissionResponseDto} = command;
        const permission = this.publisher.mergeObjectContext(
            await this.repository.replyPermissionAssign(streamId, permissionResponseDto)
        );
        permission.commit();
    }
}
