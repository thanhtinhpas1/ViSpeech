import { GetProjectAssigneesQuery } from '../impl/get-project-assignees.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from '../../dtos/users.dto';
import { Repository, getMongoRepository } from 'typeorm';
import { PermissionDto } from '../../../permissions/dtos/permissions.dto';
import { Logger } from '@nestjs/common';
import { CONSTANTS } from 'common/constant';
import { Utils } from 'utils';

@QueryHandler(GetProjectAssigneesQuery)
export class GetProjectAssigneesHandler implements IQueryHandler<GetProjectAssigneesQuery> {
    constructor(
        @InjectRepository(UserDto)
        private readonly userRepo: Repository<UserDto>,
        @InjectRepository(PermissionDto)
        private readonly permissionRepo: Repository<PermissionDto>,
    ) {
    }

    async execute(query: GetProjectAssigneesQuery) {
        Logger.log('Async GetProjectAssigneesQuery...', 'GetProjectAssigneesQuery');
        const { projectId, limit, offset, filters, sort } = query;
        try {
            const findOptions = {
                where: {
                    projectId,
                    status: CONSTANTS.STATUS.ACCEPTED
                },
                order: {}
            };
            if (filters) {
                const filterOptions = { where: {} };
                if (filters['firstName']) {
                    filterOptions.where['firstName'] = new RegExp(filters['firstName'], 'i');
                }
                if (filters['lastName']) {
                    filterOptions.where['lastName'] = new RegExp(filters['lastName'], 'i');
                }
                if (filters['username']) {
                    filterOptions.where['username'] = new RegExp(filters['username'], 'i');
                }
                if (filters['email']) {
                    filterOptions.where['email'] = new RegExp(filters['email'], 'i');
                }
                if (filters['isActive']) {
                    filterOptions.where['isActive'] = Utils.convertToBoolean(filters['isActive']);
                }
                findOptions.where['assigneeId'] = { $in: [] };
                const users = await this.userRepo.find(filterOptions);
                if (users.length > 0) {
                    const userIds = users.map(user => user._id);
                    findOptions.where['assigneeId'] = { $in: [...userIds] };
                }
            }
            if (sort) {
                const sortField = Utils.getCorrectSortField(sort.field);
                findOptions.order[sortField] = sort.order;
            }

            const permissions = await this.permissionRepo.find({ skip: offset || 0, take: limit || 0, ...findOptions });
            const assignees = [];
            for (const permission of permissions) {
                const user = await this.userRepo.findOne({ _id: permission.assigneeId });
                const { _id, firstName, lastName, email, username, isActive } = user;
                assignees.push({ _id, firstName, lastName, email, username, isActive });
            }
            const count = await getMongoRepository(PermissionDto).count(findOptions.where);

            return { data: assignees, count };
        } catch (error) {
            Logger.error(error.message, '', 'GetProjectAssigneesQuery');
        }
    }
}