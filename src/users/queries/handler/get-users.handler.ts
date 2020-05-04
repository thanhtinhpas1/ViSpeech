import { Logger } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserDto } from "users/dtos/users.dto";
import { GetUsersQuery } from "../impl/get-users.query";
import { Utils } from "utils";

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
    constructor(
        @InjectRepository(UserDto) private readonly repository: Repository<UserDto>
    ) {
    }

    async execute(query: GetUsersQuery) {
        Logger.log("Async GetUsersQuery...", "GetUsersQuery");
        const { limit, offset } = query;
        try {
            // Admin no need to find active users
            let [users, count] = limit != null && offset != null ?
                await this.repository.findAndCount({ skip: offset, take: limit }) :
                await this.repository.findAndCount();
            users = Utils.removeObjPropertiesFromObjArr(users, ['password']);
            return { data: users, count };
        } catch (error) {
            Logger.error(error, '', 'GetUsersQuery');
        }
    }
}
