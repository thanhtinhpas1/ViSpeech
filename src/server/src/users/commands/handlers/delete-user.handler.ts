import { CommandHandler, EventBus, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { DeleteUserCommand } from '../impl/delete-user.command';
import { UserRepository } from '../../repository/user.repository';
import { Logger, NotFoundException } from '@nestjs/common';
import { getMongoRepository } from 'typeorm';
import { UserDto } from 'users/dtos/users.dto';
import { UserDeletedFailedEvent } from 'users/events/impl/user-deleted.event';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
    constructor(
        private readonly repository: UserRepository,
        private readonly publisher: EventPublisher,
        private readonly eventBus: EventBus,
    ) {
    }

    async execute(command: DeleteUserCommand) {
        Logger.log('Async DeleteUserHandler...', 'DeleteUserCommand');
        const {streamId, userIdDto, isDeleted} = command;
        const userId = userIdDto._id;

        try {
            const user = await getMongoRepository(UserDto).findOne({_id: userId});
            if (!user) {
                throw new NotFoundException(`User with _id ${userId} does not exist.`);
            }

            const isDeletedStr = isDeleted ? "true" : "false";
            const userModel = this.publisher.mergeObjectContext(
                await this.repository.deleteUser(streamId, userId, isDeletedStr)
            );
            userModel.commit();
        } catch (error) {
            this.eventBus.publish(new UserDeletedFailedEvent(streamId, userId, error));
        }
    }
}
