import { IQueryHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { UserDto } from '../../dtos/users.dto';
import { FindUserByUsernameQuery } from '../impl/find-user.query';
export declare class FindUserUsernameHandler implements IQueryHandler<FindUserByUsernameQuery> {
    private readonly userRepository;
    constructor(userRepository: Repository<UserDto>);
    execute(query: FindUserByUsernameQuery): Promise<any>;
}
