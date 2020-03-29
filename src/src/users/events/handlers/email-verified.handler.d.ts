import { IEventHandler } from '@nestjs/cqrs';
import { UserDto } from 'users/dtos/users.dto';
import { Repository } from 'typeorm';
import { EmailVerifiedEvent } from '../impl/email-verified.event';
import { AuthService } from 'auth/auth.service';
export declare class EmailVerifiedHandler implements IEventHandler<EmailVerifiedEvent> {
    private readonly repository;
    private readonly authService;
    constructor(repository: Repository<UserDto>, authService: AuthService);
    handle(event: EmailVerifiedEvent): Promise<void>;
}
