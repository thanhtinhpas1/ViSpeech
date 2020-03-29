import { IEventHandler } from '@nestjs/cqrs';
import { PermissionDto } from 'permissions/dtos/permissions.dto';
import { Repository } from 'typeorm';
import { PermissionUpdatedEvent } from '../impl/permission-updated.event';
export declare class PermissionUpdatedHandler implements IEventHandler<PermissionUpdatedEvent> {
    private readonly repository;
    constructor(repository: Repository<PermissionDto>);
    handle(event: PermissionUpdatedEvent): Promise<import("typeorm").UpdateResult>;
}
