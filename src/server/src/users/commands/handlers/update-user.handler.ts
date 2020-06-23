import { CommandHandler, EventBus, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserCommand } from '../impl/update-user.command';
import { UserRepository } from '../../repository/user.repository';
import { Logger, NotFoundException } from '@nestjs/common';
import { getMongoRepository } from 'typeorm';
import { UserDto } from 'users/dtos/users.dto';
import { UserUpdatedFailedEvent } from 'users/events/impl/user-updated.event';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
    constructor(
        private readonly repository: UserRepository,
        private readonly publisher: EventPublisher,
        private readonly eventBus: EventBus,
    ) {
    }

    async execute(command: UpdateUserCommand) {
        Logger.log('Async UpdateUserHandler...', 'UpdateUserCommand');
        const {streamId, userDto} = command;

        try {
            const user = await getMongoRepository(UserDto).findOne({_id: userDto._id});
            if (!user) {
                throw new NotFoundException(`User with _id ${userDto._id} does not exist.`);
            }

            const userModel = this.publisher.mergeObjectContext(
                await this.repository.updateUser(streamId, userDto)
            );
            userModel.commit();
        } catch (error) {
            this.eventBus.publish(new UserUpdatedFailedEvent(streamId, userDto, error));
        }
    }
}
