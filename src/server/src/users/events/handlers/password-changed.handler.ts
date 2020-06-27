import { BadRequestException, Inject, Logger } from '@nestjs/common';
import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { CONSTANTS } from 'common/constant';
import { Repository } from 'typeorm';
import { config } from '../../../../config';
import { Utils } from '../../../utils';
import { UserDto } from '../../dtos/users.dto';
import {
    PasswordChangedEvent,
    PasswordChangedFailedEvent,
    PasswordChangedSuccessEvent
} from '../impl/password-changed.event';

@EventsHandler(PasswordChangedEvent)
export class PasswordChangedHandler implements IEventHandler<PasswordChangedEvent> {
    constructor(
        private readonly eventBus: EventBus,
        @InjectRepository(UserDto) private readonly repository: Repository<UserDto>,
    ) {
    }

    async handle(event: PasswordChangedEvent) {
        Logger.log(event.streamId, 'PasswordChangedEvent');
        const {streamId, changePasswordBody} = event;
        const {userId, oldPassword, newPassword} = changePasswordBody;

        try {
            const user = await this.repository.findOne({_id: userId});
            const isValid = await Utils.comparePassword(oldPassword, user.password);
            if (isValid) {
                if (oldPassword === newPassword) throw new BadRequestException('New password must be different from old password.');
                const newHashedPassword = Utils.hashPassword(newPassword);
                await this.repository.update({_id: userId}, {password: newHashedPassword});
                this.eventBus.publish(new PasswordChangedSuccessEvent(streamId, changePasswordBody));
                return;
            }
            throw new BadRequestException('Passwords do not match.');
        } catch (error) {
            this.eventBus.publish(new PasswordChangedFailedEvent(streamId, changePasswordBody, error));
        }
    }
}

@EventsHandler(PasswordChangedSuccessEvent)
export class PasswordChangedSuccessHandler implements IEventHandler<PasswordChangedSuccessEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
    }

    handle(event: PasswordChangedSuccessEvent) {
        this.clientKafka.emit(CONSTANTS.TOPICS.PASSWORD_CHANGED_SUCCESS_EVENT, JSON.stringify(event));
        Logger.log(event.streamId, 'PasswordChangedSuccessEvent');
    }
}

@EventsHandler(PasswordChangedFailedEvent)
export class PasswordChangedFailedHandler implements IEventHandler<PasswordChangedFailedEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
    }

    handle(event: PasswordChangedFailedEvent) {
        const errorObj = Utils.getErrorObj(event.error)
        event['errorObj'] = errorObj
        this.clientKafka.emit(CONSTANTS.TOPICS.PASSWORD_CHANGED_FAILED_EVENT, JSON.stringify(event));
        Logger.log(errorObj, 'PasswordChangedFailedEvent');
    }
}