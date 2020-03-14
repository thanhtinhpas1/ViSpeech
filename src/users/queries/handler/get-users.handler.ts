import {Logger} from "@nestjs/common";
import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {UserDto} from "users/dtos/users.dto";
import {GetUsersQuery} from "../impl/get-users.query";
import {CONSTANTS} from "../../../common/constant";

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
    constructor(
        @InjectRepository(UserDto) private readonly repository: Repository<UserDto>
    ) {
    }

    async execute(query: GetUsersQuery) {
        try {
            Logger.log("Async GetUsersQuery...", "GetUsersQuery");
            const user = await this.repository.findOne({_id: query.userId});
            var users = [];
            const match = user['roles'].filter(x => x.name === CONSTANTS.ROLE.ADMIN);
            if (match.length <= 0) {
                if (query.limit && query.offset)
                    return await this.repository.find({
                        skip: Number(query.offset),
                        take: Number(query.limit),
                        where: {assignerId: query.userId},
                    });
                users = await this.repository.find({where: {assignerId: query.userId}});
            }
            if (query.limit && query.offset)
                users = await this.repository.find({
                    skip: Number(query.offset),
                    take: Number(query.limit)
                });
            users = await this.repository.find();
            users.forEach(user => delete user['password']);
            return users;
        } catch (error) {
            Logger.error(error, "GetUsersQuery");
        }
    }
}
