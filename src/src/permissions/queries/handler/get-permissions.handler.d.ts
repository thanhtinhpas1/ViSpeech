import { GetPermissionsQuery } from '../impl/get-permissions.query';
import { IQueryHandler } from '@nestjs/cqrs';
import { PermissionDto } from 'permissions/dtos/permissions.dto';
import { Repository } from 'typeorm';
export declare class GetPermissionsHandler implements IQueryHandler<GetPermissionsQuery> {
    private readonly repository;
    constructor(repository: Repository<PermissionDto>);
    execute(query: GetPermissionsQuery): Promise<PermissionDto[]>;
}
