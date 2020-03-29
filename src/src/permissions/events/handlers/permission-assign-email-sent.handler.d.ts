import { EventBus, IEventHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { PermissionAssignEmailSentEvent, PermissionAssignEmailSentFailedEvent, PermissionAssignEmailSentSuccessEvent } from '../impl/permission-assign-email-sent.event';
import { UserDto } from 'users/dtos/users.dto';
import { ProjectDto } from 'projects/dtos/projects.dto';
import { AuthService } from 'auth/auth.service';
export declare class PermissionAssignEmailSentHandler implements IEventHandler<PermissionAssignEmailSentEvent> {
    private readonly userRepository;
    private readonly projectRepository;
    private readonly authService;
    private readonly eventBus;
    constructor(userRepository: Repository<UserDto>, projectRepository: Repository<ProjectDto>, authService: AuthService, eventBus: EventBus);
    handle(event: PermissionAssignEmailSentEvent): Promise<void>;
}
export declare class PermissionAssignEmailSentSuccessHandler implements IEventHandler<PermissionAssignEmailSentSuccessEvent> {
    handle(event: PermissionAssignEmailSentSuccessEvent): void;
}
export declare class PermissionAssignEmailSentFailedHandler implements IEventHandler<PermissionAssignEmailSentFailedEvent> {
    handle(event: PermissionAssignEmailSentFailedEvent): void;
}
