import { IQueryHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { UserDto } from 'users/dtos/users.dto';
import { FindUserQuery } from '../impl/find-user.query';
export declare class FindUserHandler implements IQueryHandler<FindUserQuery> {
    private readonly repository;
    constructor(repository: Repository<UserDto>);
    execute(query: FindUserQuery): Promise<UserDto>;
}
