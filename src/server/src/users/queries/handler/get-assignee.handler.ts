import {GetAssigneeQuery} from "../impl/get-assignee.query";
import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {UserDto} from "../../dtos/users.dto";
import {Repository} from "typeorm";
import {PermissionDto} from "../../../permissions/dtos/permissions.dto";

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
        const ids = permissions.map(permission => permission.assigneeId);
        const users = [];
        for (let _id of ids) {
            let user = await this.userRepo.findOne({_id});
            delete user['password'];
            if (user) users.push(user);
        }
        return {data: users, count: users.length};
    }
}