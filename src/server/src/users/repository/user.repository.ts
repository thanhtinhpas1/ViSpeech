import { Injectable } from '@nestjs/common';
import { ChangePasswordBody, UserDto, ResetPasswordBody } from 'users/dtos/users.dto';
import { User } from '../models/user.model';
import { TokenDto } from 'tokens/dtos/tokens.dto';

@Injectable()
export class UserRepository {
    async createUser(streamId: string, userDto: UserDto, freeToken: TokenDto) {
        const user = new User(streamId);
        user.setData(userDto);
        user.createUser(streamId, freeToken);
        return user;
    }

    async updateUser(streamId: string, userDto: UserDto) {
        const user = new User(streamId);
        user.setData(userDto);
        user.updateUser(streamId);
        return user;
    }

    async deleteUser(streamId: string, userId: string, isDeleted: string) {
        const user = new User(userId);
        user.deleteUser(streamId, isDeleted);
        return user;
    }

    async welcomeUser(streamId: string, userId: string) {
        const user = new User(userId);
        user.welcomeUser(streamId);
        return user;
    }

    async changePassword(streamId: string, changePasswordBody: ChangePasswordBody) {
        const user = new User(streamId);
        user.setData(changePasswordBody);
        user.changePassword(streamId);
        return user;
    }

    async sendVerifyEmail(streamId: string, userId: string) {
        const user = new User(userId);
        user.sendVerifyEmail(streamId);
        return user;
    }

    async verifyEmail(streamId: string, emailToken: string) {
        const user = new User(streamId);
        user.setData(emailToken);
        user.verifyEmail(streamId);
        return user;
    }

    async sendResetPasswordEmail(streamId: string, email: string) {
        const user = new User(undefined);
        user.setData(email);
        user.sendResetPasswordEmail(streamId);
        return user;
    }

    async resetPassword(streamId: string, resetPasswordBody: ResetPasswordBody) {
        const user = new User(undefined);
        user.setData(resetPasswordBody);
        user.resetPassword(streamId);
        return user;
    }
}
