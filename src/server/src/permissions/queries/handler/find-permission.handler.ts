import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindPermissionQuery } from '../impl/find-permission.query';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionDto } from 'permissions/dtos/permissions.dto';
import { Repository } from 'typeorm';

@QueryHandler(FindPermissionQuery)
export class FindPermissionHandler implements IQueryHandler<FindPermissionQuery> {
    constructor(
        @InjectRepository(PermissionDto)
        private readonly repository: Repository<PermissionDto>
    ) {
    }

    async execute(query: FindPermissionQuery): Promise<any> {
        Logger.log('Async FindPermissionQuery...', 'FindPermissionQuery');
        try {
            return await this.repository.findOne({_id: query.id});
        } catch (error) {
            Logger.error(error.message, '', 'FindPermissionQuery');
        }
    }
}
