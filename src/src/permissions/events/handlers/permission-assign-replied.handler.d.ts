import { IEventHandler } from '@nestjs/cqrs';
import { PermissionDto } from 'permissions/dtos/permissions.dto';
import { Repository } from 'typeorm';
import { PermissionAssignRepliedEvent } from '../impl/permission-assign-replied.event';
import { AuthService } from 'auth/auth.service';
export declare class PermissionAssignRepliedHandler implements IEventHandler<PermissionAssignRepliedEvent> {
    private readonly repository;
    private readonly authService;
    constructor(repository: Repository<PermissionDto>, authService: AuthService);
    handle(event: PermissionAssignRepliedEvent): Promise<import("typeorm").UpdateResult>;
}
