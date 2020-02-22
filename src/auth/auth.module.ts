import {Module} from '@nestjs/common';
import {PassportModule} from '@nestjs/passport';
import {JwtModule, JwtService} from '@nestjs/jwt';
import {APP_GUARD} from '@nestjs/core';
import {RolesGuard} from 'auth/roles.guard';
import {AuthController} from './auth.controllers';
import {UserDto} from 'users/dtos/users.dto';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CommandBus, QueryBus} from '@nestjs/cqrs';
import {UsersService} from '../users/services/users.service';
import {UsersModule} from '../users/users.module';
import {config} from '../../config';

@Module({
    imports: [
        JwtModule.register(config.JWT),
        TypeOrmModule.forFeature([UserDto]),
        UsersModule,
        PassportModule,
    ],
    controllers: [AuthController],
    providers: [
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
        CommandBus, QueryBus, UsersService, JwtService,
    ],
})
export class AuthModule {
}
