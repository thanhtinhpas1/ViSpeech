import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { getMongoRepository, Repository } from 'typeorm';
import { UserDto } from 'users/dtos/users.dto';
import { GetUsersQuery } from '../impl/get-users.query';
import { Utils } from 'utils';

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
    constructor(
        @InjectRepository(UserDto) private readonly repository: Repository<UserDto>
    ) {
    }

    async execute(query: GetUsersQuery) {
        Logger.log('Async GetUsersQuery...', 'GetUsersQuery');
        const {limit, offset, filters, sort} = query;
        let users = [];
        try {
            // Admin no need to find active users
            const findOptions = {
                where: {},
                order: {}
            }
            if (filters) {
                if (filters['firstName']) {
                    findOptions.where['firstName'] = new RegExp(filters['firstName'], 'i')
                }
                if (filters['lastName']) {
                    findOptions.where['lastName'] = new RegExp(filters['lastName'], 'i')
                }
                if (filters['username']) {
                    findOptions.where['username'] = new RegExp(filters['username'], 'i')
                }
                if (filters['email']) {
                    findOptions.where['email'] = new RegExp(filters['email'], 'i')
                }
                if (filters['roles']) {
                    findOptions.where['roles.name'] = filters['roles']
                }
                if (filters['isActive']) {
                    findOptions.where['isActive'] = Utils.convertToBoolean(filters['isActive'])
                }
            }
            if (sort) {
                const sortField = Utils.getCorrectSortField(sort.field)
                findOptions.order[sortField] = sort.order
            }

            users = await this.repository.find({skip: offset || 0, take: limit || 0, ...findOptions});
            users = Utils.removeObjPropertiesFromObjArr(users, ['password']);
            users = users.filter(user => user.username !== 'admin');
            const count = await getMongoRepository(UserDto).count(findOptions.where) - 1;
            return {data: users, count};
        } catch (error) {
            Logger.error(error, '', 'GetUsersQuery');
        }
    }
}
