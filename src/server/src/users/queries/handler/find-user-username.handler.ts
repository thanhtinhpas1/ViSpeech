import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from '../../dtos/users.dto';
import { FindUserByUsernameQuery } from '../impl/find-user.query';

@QueryHandler(FindUserByUsernameQuery)
export class FindUserUsernameHandler
    implements IQueryHandler<FindUserByUsernameQuery> {
    constructor(
        @InjectRepository(UserDto)
        private readonly userRepository: Repository<UserDto>
    ) {
    }

    async execute(query: FindUserByUsernameQuery): Promise<any> {
        Logger.log('Async FindUserByUsernameQuery...', 'FindUserByUsernameQuery');
        try {
            return await this.userRepository.findOne({ username: query.username });
        } catch (error) {
            Logger.error(error.message, '', 'FindUserByUsernameQuery');
        }

    }
}
