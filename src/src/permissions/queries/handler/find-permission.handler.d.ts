import { IQueryHandler } from '@nestjs/cqrs';
import { FindPermissionQuery } from '../impl/find-permission.query';
import { PermissionDto } from 'permissions/dtos/permissions.dto';
import { Repository } from 'typeorm';
export declare class FindPermissionHandler implements IQueryHandler<FindPermissionQuery> {
    private readonly repository;
    constructor(repository: Repository<PermissionDto>);
    execute(query: FindPermissionQuery): Promise<any>;
}
