import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { config } from "../../config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: config.JWT
    });
  }

  async validate(payload: any) {
    const user = await this.authService.validateUserId(payload.sub);
    if (!user) {
      return null;
    }
    return user;
  }
}
