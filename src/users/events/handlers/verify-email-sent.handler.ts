import {EventBus, EventsHandler, IEventHandler} from '@nestjs/cqrs';
import {Logger, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {UserDto} from 'users/dtos/users.dto';
import {Repository} from 'typeorm';
import {
    VerifyEmailSentEvent,
    VerifyEmailSentFailedEvent,
    VerifyEmailSentSuccessEvent
} from '../impl/verify-email-sent.event';
import {AuthService} from 'auth/auth.service';
import {EmailUtils} from 'utils/email.util';

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
        const {streamId, userId} = event;

        try {
            const user = await this.repository.findOne({_id: userId});
            if (!user) {
                throw new NotFoundException(`User with _id ${userId} does not exist.`);
            }

            const verifyEmailToken = this.authService.generateTokenWithUserId(userId, '2 days');
            await EmailUtils.sendVerifyEmail(user.username, user.email, verifyEmailToken);
            this.eventBus.publish(new VerifyEmailSentSuccessEvent(streamId, userId));
        } catch (error) {
            this.eventBus.publish(new VerifyEmailSentFailedEvent(streamId, userId, error.message));
        }
    }
}

@EventsHandler(VerifyEmailSentSuccessEvent)
export class VerifyEmailSentSuccessHandler
    implements IEventHandler<VerifyEmailSentSuccessEvent> {
    handle(event: VerifyEmailSentSuccessEvent) {
        Logger.log(event.userId, 'VerifyEmailSentSuccessEvent');
    }
}

@EventsHandler(VerifyEmailSentFailedEvent)
export class VerifyEmailSentFailedHandler
    implements IEventHandler<VerifyEmailSentFailedEvent> {
    handle(event: VerifyEmailSentFailedEvent) {
        Logger.log(event.error, 'VerifyEmailSentFailedEvent');
    }
}
