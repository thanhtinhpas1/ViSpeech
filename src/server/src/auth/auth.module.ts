import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'auth/roles.guard';
import { AuthController } from './auth.controllers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { config } from '../../config';
import { AuthService } from './auth.service';
import { UserDto } from '../users/dtos/users.dto';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { FacebookStrategy } from './facebook.strategy';
import { GoogleStrategy } from './google.strategy';
import { RoleDto } from 'roles/dtos/roles.dto';
import { CommandBus } from "@nestjs/cqrs";

@Module({
    imports: [
        JwtModule.register(config.JWT),
        TypeOrmModule.forFeature([UserDto, RoleDto]),
        forwardRef(() => UsersModule),
        PassportModule,
    ],
    controllers: [AuthController],
    providers: [
        {
            provide: APP_GUARD,
            useClass: RolesGuard
        },
        LocalStrategy,
        JwtStrategy,
        FacebookStrategy,
        GoogleStrategy,
        AuthService,
        CommandBus,
    ],
    exports: [JwtModule, AuthService]
})
export class AuthModule {
}
