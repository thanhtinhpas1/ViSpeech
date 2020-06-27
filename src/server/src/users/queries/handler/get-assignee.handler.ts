import { GetAssigneeQuery } from "../impl/get-assignee.query";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDto } from "../../dtos/users.dto";
import { Repository } from "typeorm";
import { PermissionDto } from "../../../permissions/dtos/permissions.dto";

@QueryHandler(GetAssigneeQuery)
export class GetAssigneeHandler implements IQueryHandler<GetAssigneeQuery> {
    constructor(
        @InjectRepository(UserDto)
        private readonly userRepo: Repository<UserDto>,
        @InjectRepository(PermissionDto)
        private readonly permissionRepo: Repository<PermissionDto>,
    ) {
    }

    async execute(query: GetAssigneeQuery) {
        const permissions = await this.permissionRepo.find({projectId: query.projectId});
        const users = permissions.map(permission => {
            return this.userRepo.findOne({_id: permission.assigneeId})
        })

        return {data: users, count: users.length};
    }
}