import { BadRequestException, Inject, Logger } from '@nestjs/common';
import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { CONSTANTS } from 'common/constant';
import { Repository } from 'typeorm';
import { config } from '../../../../config';
import { Utils } from '../../../utils';
import { UserDto } from '../../dtos/users.dto';
import { PasswordResetEvent, PasswordResetSuccessEvent, PasswordResetFailedEvent } from '../impl/password-reset.event';

@EventsHandler(PasswordResetEvent)
export class PasswordResetHandler implements IEventHandler<PasswordResetEvent> {
    constructor(
        private readonly eventBus: EventBus,
        @InjectRepository(UserDto) private readonly repository: Repository<UserDto>,
    ) {
    }

    async handle(event: PasswordResetEvent) {
        Logger.log(event.streamId, 'PasswordResetEvent');
        const { streamId, resetPasswordBody } = event;
        const { userId, password } = resetPasswordBody;

        try {
            const user = await this.repository.findOne({ _id: userId });
            const samePassword = await Utils.comparePassword(password, user.password);
            if (!samePassword) {
                const newHashedPassword = Utils.hashPassword(password);
                await this.repository.update({ _id: userId }, { password: newHashedPassword, updatedDate: new Date() });
                this.eventBus.publish(new PasswordResetSuccessEvent(streamId, resetPasswordBody));
                return;
            }
        } catch (error) {
            this.eventBus.publish(new PasswordResetFailedEvent(streamId, resetPasswordBody, error));
        }
    }
}

@EventsHandler(PasswordResetSuccessEvent)
export class PasswordResetSuccessHandler implements IEventHandler<PasswordResetSuccessEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
    }

    handle(event: PasswordResetSuccessEvent) {
        this.clientKafka.emit(CONSTANTS.TOPICS.PASSWORD_RESET_SUCCESS_EVENT, JSON.stringify(event));
        Logger.log(event.streamId, 'PasswordResetSuccessEvent');
    }
}

@EventsHandler(PasswordResetFailedEvent)
export class PasswordResetFailedHandler implements IEventHandler<PasswordResetFailedEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
    }

    handle(event: PasswordResetFailedEvent) {
        const errorObj = Utils.getErrorObj(event.error);
        event['errorObj'] = errorObj;
        this.clientKafka.emit(CONSTANTS.TOPICS.PASSWORD_RESET_FAILED_EVENT, JSON.stringify(event));
        Logger.log(errorObj, 'PasswordResetFailedEvent');
    }
}