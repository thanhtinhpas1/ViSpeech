import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {FindUserByUsernameQuery} from '../impl/find-user.query';
import {InjectRepository} from '@nestjs/typeorm';
import {UserDto} from '../../dtos/users.dto';
import {Repository} from 'typeorm';

@QueryHandler(FindUserByUsernameQuery)
export class FindUserUsernameHandler implements IQueryHandler<FindUserByUsernameQuery> {
    constructor(
        @InjectRepository(UserDto)
        private readonly userRepository: Repository<UserDto>,
    ) {
    }

    execute(query: FindUserByUsernameQuery): Promise<any> {
        return this.userRepository.findOne({username: query.username});
    }
}