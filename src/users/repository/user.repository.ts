import {Injectable} from '@nestjs/common';
import {User} from '../models/user.model';

@Injectable()
export class UserRepository {

    async createUser(userDto) {
        const user = new User(undefined);
        user.setData(userDto);
        user.createUser();
        return user;
    }

    async updateUser(userDto) {
        const user = new User(userDto.id);
        user.setData(userDto);
        user.updateUser();
        return user;
    }

    async deleteUser(userId) {
        const user = new User(userId);
        user.deleteUser();
        return user;
    }

    async welcomeUser(userId) {
        const user = new User(userId);
        user.welcomeUser();
        return user;
    }
}
