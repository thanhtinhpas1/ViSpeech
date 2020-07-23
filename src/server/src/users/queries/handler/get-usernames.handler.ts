import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { getMongoRepository, Repository } from 'typeorm';
import { UserDto } from 'users/dtos/users.dto';
import { GetUsernamesQuery } from '../impl/get-usernames.query';
import { Utils } from 'utils';

@QueryHandler(GetUsernamesQuery)
export class GetUsernamesHandler implements IQueryHandler<GetUsernamesQuery> {
    constructor(
        @InjectRepository(UserDto) private readonly repository: Repository<UserDto>
    ) {
    }

    async execute(query: GetUsernamesQuery) {
        Logger.log('Async GetUsernamesQuery...', 'GetUsernamesQuery');
        const {limit, offset, filters} = query;
        try {
            const findOptions = {
                where: {},
                order: {}
            }
            if (filters) {
                if (filters['isActive']) {
                    findOptions.where['isActive'] = Utils.convertToBoolean(filters['isActive'])
                }
            }
            const users = await this.repository.find({skip: offset || 0, take: limit || 0, ...findOptions});
            const usernames = users.map(user => user.username).filter(username => username !== 'admin');
            const count = await getMongoRepository(UserDto).count(findOptions.where) - 1;
            return {data: usernames, count};
        } catch (error) {
            Logger.error(error, '', 'GetUsernamesQuery');
        }
    }
}
