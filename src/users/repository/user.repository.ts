import { Injectable } from "@nestjs/common";
import { UserDto } from "users/dtos/users.dto";
import { User } from "../models/user.model";

@Injectable()
export class UserRepository {
  async createUser(transactionId: string, userDto: UserDto) {
    const user = new User(undefined);
    user.setData(userDto);
    user.createUser(transactionId);
    return user;
  }

  async createUserStart(transactionId: string, userDto: UserDto) {
    const user = new User(undefined);
    user.setData(userDto);
    user.createUserStart(transactionId);
    return user;
  }

  async updateUser(transactionId: string, userDto: UserDto) {
    const user = new User(undefined);
    user.setData(userDto);
    user.updateUser(transactionId);
    return user;
  }

  async deleteUser(transactionId: string, userId: string) {
    const user = new User(userId);
    user.deleteUser(transactionId);
    return user;
  }

  async welcomeUser(userId: string) {
    const user = new User(userId);
    user.welcomeUser();
    return user;
  }

  async assignRoleUser(userId: string, roleName: string) {
    const user = new User(userId);
    user.assignRoleUser(userId, roleName);
    return user;
  }
}
