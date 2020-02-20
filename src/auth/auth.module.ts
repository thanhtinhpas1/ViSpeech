import { Module, forwardRef } from "@nestjs/common";
import { LocalStrategy } from "./local.strategy";
import { JwtStrategy } from "./jwt.strategy";
import { PassportModule } from "@nestjs/passport";
import { jwtConstants } from "./constants";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { APP_GUARD } from "@nestjs/core";
import { RolesGuard } from "security/roles.guard";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controllers";
import { UsersModule } from "users/users.module";
import { UserDto } from "users/dtos/users.dto";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserDto]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {}
    }),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    LocalStrategy,
    JwtStrategy,
    AuthService
  ],
  exports: [AuthService]
})
export class AuthModule { }
