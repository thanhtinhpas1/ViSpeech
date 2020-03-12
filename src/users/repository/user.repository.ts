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

  async updateUser(transactionId: string, updatedBy: string, roleNames: string[], userDto: UserDto) {
    const user = new User(undefined);
    user.setData(userDto);
    user.updateUser(transactionId, updatedBy, roleNames);
    return user;
  }

  async deleteUser(transactionId: string, updatedBy: string, roleNames: string[], userId: string) {
    const user = new User(userId);
    user.deleteUser(transactionId, updatedBy, roleNames);
    return user;
  }

  async welcomeUser(transactionId: string, userId: string) {
    const user = new User(userId);
    user.welcomeUser(transactionId);
    return user;
  }

  async assignUserRole(transactionId: string, userId: string, roleNames: string[], assignerId: string) {
    const user = new User(userId);
    user.assignUserRole(transactionId, userId, roleNames, assignerId);
    return user;
  }
}
