import {Logger} from "@nestjs/common";
import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {UserDto} from "users/dtos/users.dto";
import {FindUserQuery} from "../impl/find-user.query";

@QueryHandler(FindUserQuery)
export class FindUserHandler implements IQueryHandler<FindUserQuery> {
    constructor(
        @InjectRepository(UserDto)
        private readonly repository: Repository<UserDto>
    ) {
    }

    async execute(query: FindUserQuery) {
        try {
            const user = await this.repository.findOne({_id: query.id.toString()});
            delete user['password'];
            Logger.log("Async FindUserQuery...", "FindUserQuery");
            return user;
        } catch (error) {
            Logger.error(error.message, "", "FindUserQuery");
            return null;
        }
    }
}
