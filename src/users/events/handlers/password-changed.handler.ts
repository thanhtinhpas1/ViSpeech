import {EventBus, EventsHandler, IEventHandler} from '@nestjs/cqrs';
import {Logger, NotFoundException} from '@nestjs/common';
import {PasswordChangedEvent, PasswordChangedFailedEvent, PasswordChangedSuccessEvent} from '../impl/password-changed.event';
import {InjectRepository} from '@nestjs/typeorm';
import {UserDto} from '../../dtos/users.dto';
import {Repository} from 'typeorm';
import {Utils} from '../../../utils';

@EventsHandler(PasswordChangedEvent)
export class PasswordChangedHandler implements IEventHandler<PasswordChangedEvent> {
    constructor(
        private readonly eventBus: EventBus,
        @InjectRepository(UserDto) private readonly repository: Repository<UserDto>,
    ) {
    }

    async handle(event: PasswordChangedEvent) {
        Logger.log(event.userId, 'PasswordChangedEvent');
        const {streamId, userId, newPassword, oldPassword} = event;

        try {
            const user = await this.repository.findOne({_id: userId});
            if (!user) throw new NotFoundException(`User with _id ${userId} does not exist.`);

            const isValid = await Utils.comparePassword(oldPassword, user.password);
            if (isValid) {
                if (oldPassword === newPassword) throw new Error('New password must be different than old password.');
                user.password = Utils.hashPassword(newPassword);
                await this.repository.update({_id: userId}, user);
                this.eventBus.publish(new PasswordChangedSuccessEvent(streamId, userId, newPassword, oldPassword));
                return;
            }
            throw new Error('Passwords do not match.');
        } catch (error) {
            this.eventBus.publish(new PasswordChangedFailedEvent(streamId, userId, newPassword, oldPassword, error));
        }
    }
}