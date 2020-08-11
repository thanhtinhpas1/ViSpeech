import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionDto } from 'permissions/dtos/permissions.dto';
import { Repository } from 'typeorm';
import { FindPermissionsByIdsQuery } from '../impl/find-permissions-by-ids.query';

@QueryHandler(FindPermissionsByIdsQuery)
export class FindPermissionsByIdsHandler implements IQueryHandler<FindPermissionsByIdsQuery> {
    constructor(
        @InjectRepository(PermissionDto)
        private readonly repository: Repository<PermissionDto>
    ) {
    }

    async execute(query: FindPermissionsByIdsQuery): Promise<any> {
        Logger.log('Async FindPermissionsByIdsQuery...', 'FindPermissionsByIdsQuery');
        const { assigneeId, assignerId, projectId, status } = query;
        try {
            if (!assigneeId && !assignerId && !projectId) return [];

            const findOptions = {
                where: {},
            };
            if (assigneeId) findOptions.where['assigneeId'] = assigneeId;
            if (assignerId) findOptions.where['assignerId'] = assignerId;
            if (projectId) findOptions.where['projectId'] = projectId;
            if (status) findOptions.where['status'] = status;

            return await this.repository.find({ ...findOptions, order: { updatedDate: 'DESC' } });
        } catch (error) {
            Logger.error(error.message, '', 'FindPermissionsByIdsQuery');
        }
    }
}
