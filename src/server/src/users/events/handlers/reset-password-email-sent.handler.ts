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
import { Utils } from 'utils';
import { 
    ResetPasswordEmailSentEvent,
    ResetPasswordEmailSentSuccessEvent,
    ResetPasswordEmailSentFailedEvent
} from '../impl/reset-password-email-sent.event';

@EventsHandler(ResetPasswordEmailSentEvent)
export class ResetPasswordEmailSentHandler implements IEventHandler<ResetPasswordEmailSentEvent> {
    constructor(
        private readonly eventBus: EventBus,
        private readonly authService: AuthService,
        @InjectRepository(UserDto) private readonly repository: Repository<UserDto>
    ) {
    }

    async handle(event: ResetPasswordEmailSentEvent) {
        Logger.log(event.email, 'ResetPasswordEmailSentEvent');
        const { streamId, email } = event;

        try {
            const user = await this.repository.findOne({ email });
            const resetPasswordToken = this.authService.generateTokenWithUserId(user._id, `${CONSTANTS.TOKEN_EXPIRATION.RESET_PASSWORD} days`);
            await EmailUtils.sendResetPasswordEmail(user.username, user.email, resetPasswordToken);
            this.eventBus.publish(new ResetPasswordEmailSentSuccessEvent(streamId, email));
        } catch (error) {
            this.eventBus.publish(new ResetPasswordEmailSentFailedEvent(streamId, email, error));
        }
    }
}

@EventsHandler(ResetPasswordEmailSentSuccessEvent)
export class ResetPasswordEmailSentSuccessHandler
    implements IEventHandler<ResetPasswordEmailSentSuccessEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
        this.clientKafka.connect();
    }

    handle(event: ResetPasswordEmailSentSuccessEvent) {
        this.clientKafka.emit(CONSTANTS.TOPICS.RESET_PASSWORD_EMAIL_SENT_SUCCESS_EVENT, JSON.stringify(event));
        Logger.log(event.email, 'ResetPasswordEmailSentSuccessEvent');
    }
}

@EventsHandler(ResetPasswordEmailSentFailedEvent)
export class ResetPasswordEmailSentFailedHandler
    implements IEventHandler<ResetPasswordEmailSentFailedEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
        this.clientKafka.connect();
    }

    handle(event: ResetPasswordEmailSentFailedEvent) {
        const errorObj = Utils.getErrorObj(event.error);
        event['errorObj'] = errorObj;
        this.clientKafka.emit(CONSTANTS.TOPICS.RESET_PASSWORD_EMAIL_SENT_FAILED_EVENT, JSON.stringify(event));
        Logger.log(errorObj, 'ResetPasswordEmailSentFailedEvent');
    }
}
