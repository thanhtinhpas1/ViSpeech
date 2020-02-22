import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Utils } from "utils";
import { UserDto } from "users/dtos/users.dto";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(UserDto)
    private readonly repository: Repository<UserDto>
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.findUserByUsername(username);
    if (user && Utils.comparePassword(user.password, pass)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async validateUserId(userId: string) {
    const user = await this.repository.findOne(userId, {
      relations: ["roles"]
    });
    return user || null;
  }

  generate_token(userId, username) {
    const payload = { username, sub: userId };
    return this.jwtService.sign(payload);
  }

  generate_token_with_userId(userId) {
    const payload = { sub: userId };
    return this.jwtService.sign(payload);
  }

  async findUserByUsername(username: string) {
    return await this.repository.findOne(
      { username },
      { relations: ["roles"] }
    );
  }

  async findUserRoles(userId: string) {
    return await this.repository.findOne(userId, {
      relations: ["user_roles"]
    });
  }
}
