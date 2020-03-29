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
        Logger.log(event.streamId, 'PasswordChangedEvent');
        const { streamId, changePasswordBody } = event;
        const { userId, oldPassword, newPassword } = changePasswordBody;

        try {
            const user = await this.repository.findOne({ _id: userId });
            if (!user) throw new NotFoundException(`User with _id ${userId} does not exist.`);

            const isValid = await Utils.comparePassword(oldPassword, user.password);
            if (isValid) {
                if (oldPassword === newPassword) throw new Error('New password must be different from old password.');
                const newHashedPassword = Utils.hashPassword(newPassword);
                await this.repository.update({_id: userId}, { password: newHashedPassword });
                this.eventBus.publish(new PasswordChangedSuccessEvent(streamId, changePasswordBody));
                return;
            }
            throw new Error('Passwords do not match.');
        } catch (error) {
            this.eventBus.publish(new PasswordChangedFailedEvent(streamId, changePasswordBody, error));
        }
    }
}

@EventsHandler(PasswordChangedSuccessEvent)
export class PasswordChangedSuccessHandler implements IEventHandler<PasswordChangedSuccessEvent> {
    handle(event: PasswordChangedSuccessEvent) {
        Logger.log(event.streamId, 'PasswordChangedSuccessEvent');
    }
}

@EventsHandler(PasswordChangedFailedEvent)
export class PasswordChangedFailedHandler implements IEventHandler<PasswordChangedFailedEvent> {
    handle(event: PasswordChangedFailedEvent) {
        Logger.log(event.error, 'PasswordChangedFailedEvent');
    }
}