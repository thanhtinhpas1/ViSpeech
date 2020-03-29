import { EventBus, IEventHandler } from '@nestjs/cqrs';
import { UserDto } from 'users/dtos/users.dto';
import { Repository } from 'typeorm';
import { VerifyEmailSentEvent, VerifyEmailSentFailedEvent, VerifyEmailSentSuccessEvent } from '../impl/verify-email-sent.event';
import { AuthService } from 'auth/auth.service';
export declare class VerifyEmailSentHandler implements IEventHandler<VerifyEmailSentEvent> {
    private readonly eventBus;
    private readonly authService;
    private readonly repository;
    constructor(eventBus: EventBus, authService: AuthService, repository: Repository<UserDto>);
    handle(event: VerifyEmailSentEvent): Promise<void>;
}
export declare class VerifyEmailSentSuccessHandler implements IEventHandler<VerifyEmailSentSuccessEvent> {
    handle(event: VerifyEmailSentSuccessEvent): void;
}
export declare class VerifyEmailSentFailedHandler implements IEventHandler<VerifyEmailSentFailedEvent> {
    handle(event: VerifyEmailSentFailedEvent): void;
}
