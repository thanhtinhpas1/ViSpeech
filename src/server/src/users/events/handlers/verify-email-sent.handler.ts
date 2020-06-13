import { Inject, Logger } from '@nestjs/common';
import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'auth/auth.service';
import { CONSTANTS } from 'common/constant';
import { Repository } from 'typeorm';
import { UserDto } from 'users/dtos/users.dto';
import { EmailUtils } from 'utils/email.util';
import { config } from '../../../../config';
import { VerifyEmailSentEvent, VerifyEmailSentFailedEvent, VerifyEmailSentSuccessEvent } from '../impl/verify-email-sent.event';
import { Utils } from 'utils';

@EventsHandler(VerifyEmailSentEvent)
export class VerifyEmailSentHandler implements IEventHandler<VerifyEmailSentEvent> {
    constructor(
        private readonly eventBus: EventBus,
        private readonly authService: AuthService,
        @InjectRepository(UserDto) private readonly repository: Repository<UserDto>
    ) {
    }

    async handle(event: VerifyEmailSentEvent) {
        Logger.log(event.userId, 'VerifyEmailSentEvent');
        const { streamId, userId } = event;

        try {
            const user = await this.repository.findOne({ _id: userId });
            const verifyEmailToken = this.authService.generateTokenWithUserId(userId, `${CONSTANTS.TOKEN_EXPIRATION.VERIFY_EMAIL} days`);
            await EmailUtils.sendVerifyEmail(user.username, user.email, verifyEmailToken);
            this.eventBus.publish(new VerifyEmailSentSuccessEvent(streamId, userId));
        } catch (error) {
            this.eventBus.publish(new VerifyEmailSentFailedEvent(streamId, userId, error));
        }
    }
}

@EventsHandler(VerifyEmailSentSuccessEvent)
export class VerifyEmailSentSuccessHandler
    implements IEventHandler<VerifyEmailSentSuccessEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
        this.clientKafka.connect();
    }
    handle(event: VerifyEmailSentSuccessEvent) {
        this.clientKafka.emit(CONSTANTS.TOPICS.VERIFY_EMAIL_SENT_SUCCESS_EVENT, JSON.stringify(event));
        Logger.log(event.userId, 'VerifyEmailSentSuccessEvent');
    }
}

@EventsHandler(VerifyEmailSentFailedEvent)
export class VerifyEmailSentFailedHandler
    implements IEventHandler<VerifyEmailSentFailedEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
        this.clientKafka.connect();
    }
    handle(event: VerifyEmailSentFailedEvent) {
        const errorObj = Utils.getErrorObj(event.error)
        event['errorObj'] = errorObj
        this.clientKafka.emit(CONSTANTS.TOPICS.VERIFY_EMAIL_SENT_FAILED_EVENT, JSON.stringify(event));
        Logger.log(errorObj, 'VerifyEmailSentFailedEvent');
    }
}
