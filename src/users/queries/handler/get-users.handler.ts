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
        let users = [];
        try {
            const findOptions = { where: { isActive: true } }
            users = limit != null && offset != null ? 
                await this.repository.find({ skip: offset, take: limit, ...findOptions }) : 
                await this.repository.find(findOptions);
            users = Utils.removeObjPropertiesFromObjArr(users, ['password']);
            const count = await this.repository.count(findOptions.where);
            return { data: users, count };
        } catch (error) {
            Logger.error(error, '', 'GetUsersQuery');
        }
    }
}
