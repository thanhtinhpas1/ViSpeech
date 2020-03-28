import {Logger} from '@nestjs/common';
import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {UserDto} from 'users/dtos/users.dto';
import {GetUsersQuery} from '../impl/get-users.query';
import {CONSTANTS} from '../../../common/constant';
import {Utils} from 'utils';

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
    constructor(
        @InjectRepository(UserDto) private readonly repository: Repository<UserDto>
    ) {
    }

    async execute(query: GetUsersQuery) {
        Logger.log('Async GetUsersQuery...', 'GetUsersQuery');
        const {userId, limit, offset} = query;
        let users = [];
        try {
            const user = await this.repository.findOne({_id: userId});
            const findResult = user.roles.findIndex(role => role.name === CONSTANTS.ROLE.ADMIN);
            if (findResult === -1) { // not admin
                users = limit && offset ?
                    await this.repository.find({skip: offset, take: limit, where: {assignerId: userId}}) :
                    await this.repository.find({where: {assignerId: userId}});
            } else {
                users = limit && offset ?
                    await this.repository.find({skip: offset, take: limit}) :
                    await this.repository.find();
            }
            users = Utils.removeObjPropertiesFromObjArr(users, ['password']);
            return users;
        } catch (error) {
            Logger.error(error, '', 'GetUsersQuery');
        }
    }
}
