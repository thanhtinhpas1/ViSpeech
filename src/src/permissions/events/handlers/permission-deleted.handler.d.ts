import { IEventHandler } from '@nestjs/cqrs';
import { PermissionDto } from 'permissions/dtos/permissions.dto';
import { PermissionDeletedEvent } from '../impl/permission-deleted.event';
import { Repository } from 'typeorm';
export declare class PermissionDeletedHandler implements IEventHandler<PermissionDeletedEvent> {
    private readonly repository;
    constructor(repository: Repository<PermissionDto>);
    handle(event: PermissionDeletedEvent): Promise<void>;
}
