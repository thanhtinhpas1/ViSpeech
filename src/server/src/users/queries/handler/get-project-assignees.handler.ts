import { GetProjectAssigneesQuery } from '../impl/get-project-assignees.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from '../../dtos/users.dto';
import { Repository } from 'typeorm';
import { PermissionDto } from '../../../permissions/dtos/permissions.dto';
import { Logger } from '@nestjs/common';
import { CONSTANTS } from 'common/constant';

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
        const { projectId } = query;
        try {
            const permissions = await this.permissionRepo.find({ projectId, status: CONSTANTS.STATUS.ACCEPTED });
            const assignees = [];
            for (const permission of permissions) {
                const user = await this.userRepo.findOne({ _id: permission.assigneeId });
                assignees.push({ _id: user._id, username: user.username });
            }
            return assignees;
        } catch (error) {
            Logger.error(error.message, '', 'GetProjectAssigneesQuery');
        }
    }
}