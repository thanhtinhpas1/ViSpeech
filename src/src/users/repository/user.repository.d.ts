import { UserDto } from 'users/dtos/users.dto';
import { User } from '../models/user.model';
export declare class UserRepository {
    createUser(streamId: string, userDto: UserDto): Promise<User>;
    createUserStart(streamId: string, userDto: UserDto): Promise<User>;
    updateUser(streamId: string, userDto: UserDto): Promise<User>;
    deleteUser(streamId: string, userId: string): Promise<User>;
    welcomeUser(streamId: string, userId: string): Promise<User>;
    changePassword(streamId: string, userId: string, newPassword: string, oldPassword: string): Promise<User>;
    sendVerifyEmail(streamId: string, userId: string): Promise<User>;
    verifyEmail(streamId: string, emailToken: string): Promise<User>;
}
