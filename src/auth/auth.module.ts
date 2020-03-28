import { Module, OnModuleInit, forwardRef } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { APP_GUARD } from "@nestjs/core";
import { RolesGuard } from "auth/roles.guard";
import { AuthController } from "./auth.controllers";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { UsersModule } from "../users/users.module";
import { config } from "../../config";
import { AuthService } from "./auth.service";
import { UserDto } from "../users/dtos/users.dto";
import { LocalStrategy } from "./local.strategy";
import { JwtStrategy } from "./jwt.strategy";
import { QueryHandlers } from "../users/queries/handler";

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
    LocalStrategy,
    JwtStrategy,
    CommandBus,
    QueryBus,
    AuthService
  ],
  exports: [JwtModule, AuthService]
})
export class AuthModule {
  constructor(private readonly query$: QueryBus) {}

}
