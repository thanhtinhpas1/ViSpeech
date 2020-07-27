import { GetPermissionsQuery } from '../impl/get-permissions.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionDto } from 'permissions/dtos/permissions.dto';
import { Repository } from 'typeorm';

@QueryHandler(GetPermissionsQuery)
export class GetPermissionsHandler implements IQueryHandler<GetPermissionsQuery> {
    constructor(
        @InjectRepository(PermissionDto)
        private readonly repository: Repository<PermissionDto>
    ) {
    }

    async execute(query: GetPermissionsQuery) {
        Logger.log('Async GetPermissionsHandler...', 'GetPermissionsQuery');
        const { offset, limit } = query;
        let permissions = [];
        try {
            permissions = limit != null && offset != null ?
                await this.repository.find({ skip: offset, take: limit }) :
                await this.repository.find();
            const count = await this.repository.count();
            return { data: permissions, count };
        } catch (error) {
            Logger.error(error.message, '', 'GetPermissionsQuery');
        }
    }
}
