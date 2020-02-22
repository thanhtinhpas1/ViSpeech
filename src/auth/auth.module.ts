import { Module, forwardRef } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { APP_GUARD } from "@nestjs/core";
import { RolesGuard } from "auth/roles.guard";
import { AuthController } from "./auth.controllers";
import { UserDto } from "users/dtos/users.dto";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { UsersModule } from "../users/users.module";
import { config } from "../../config";
import { JwtStrategy } from "./jwt.strategy";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./local.strategy";

@Module({
  imports: [
    JwtModule.register(config.JWT),
    TypeOrmModule.forFeature([UserDto]),
    forwardRef(() => UsersModule),
    PassportModule
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    },
    CommandBus,
    QueryBus,
    LocalStrategy,
    JwtStrategy,
    AuthService
  ],
  exports: [AuthService]
})
export class AuthModule {}
