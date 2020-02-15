import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/services/users.service";
import { JwtService } from "@nestjs/jwt";
import { Utils } from "utils";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (user && Utils.comparePassword(user.password, pass)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  generate_token(userId, username) {
    const payload = { username, sub: userId };
    return this.jwtService.sign(payload);
  }

  generate_token_with_userId(userId) {
    const payload = { sub: userId };
    return this.jwtService.sign(payload);
  }
}
