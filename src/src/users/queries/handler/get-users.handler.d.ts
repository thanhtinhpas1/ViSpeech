import { IQueryHandler } from "@nestjs/cqrs";
import { Repository } from "typeorm";
import { UserDto } from "users/dtos/users.dto";
import { GetUsersQuery } from "../impl/get-users.query";
export declare class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
    private readonly repository;
    constructor(repository: Repository<UserDto>);
    execute(query: GetUsersQuery): Promise<any[]>;
}
