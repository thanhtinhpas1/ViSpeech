import { EventBus, IEventHandler } from '@nestjs/cqrs';
import { PermissionCreatedEvent, PermissionCreatedFailedEvent, PermissionCreatedSuccessEvent } from '../impl/permission-created.event';
import { PermissionDto } from 'permissions/dtos/permissions.dto';
import { Repository } from 'typeorm';
export declare class PermissionCreatedHandler implements IEventHandler<PermissionCreatedEvent> {
    private readonly repository;
    private readonly eventBus;
    constructor(repository: Repository<PermissionDto>, eventBus: EventBus);
    handle(event: PermissionCreatedEvent): Promise<void>;
}
export declare class PermissionCreatedSuccessHandler implements IEventHandler<PermissionCreatedSuccessEvent> {
    handle(event: PermissionCreatedSuccessEvent): void;
}
export declare class PermissionCreatedFailedHandler implements IEventHandler<PermissionCreatedFailedEvent> {
    handle(event: PermissionCreatedFailedEvent): void;
}
