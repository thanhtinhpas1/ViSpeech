import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from 'users/dtos/users.dto';
import { FindUserQuery } from '../impl/find-user.query';
import { Utils } from 'utils';

@QueryHandler(FindUserQuery)
export class FindUserHandler implements IQueryHandler<FindUserQuery> {
    constructor(
        @InjectRepository(UserDto)
        private readonly repository: Repository<UserDto>,
    ) {
    }

    async execute(query: FindUserQuery) {
        Logger.log('Async FindUserQuery...', 'FindUserQuery');
        try {
            let user = await this.repository.findOne({ _id: query.id });
            user = Utils.removePropertyFromObject(user, 'password');
            return user;
        } catch (error) {
            Logger.error(error.message, '', 'FindUserQuery');
        }
    }
}
