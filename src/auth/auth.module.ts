import {Module, OnModuleInit} from '@nestjs/common';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
import {APP_GUARD} from '@nestjs/core';
import {RolesGuard} from 'auth/roles.guard';
import {AuthController} from './auth.controllers';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CommandBus, QueryBus} from '@nestjs/cqrs';
import {UsersService} from '../users/services/users.service';
import {UsersModule} from '../users/users.module';
import {config} from '../../config';
import {AuthService} from './auth.service';
import {UserDto} from '../users/dtos/users.dto';
import {LocalStrategy} from './local.strategy';
import {JwtStrategy} from './jwt.strategy';
import {QueryHandlers} from '../users/queries/handler';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserDto]),
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: config.JWT.secret,
        }),
    ],
    controllers: [AuthController],
    providers: [
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
        LocalStrategy, JwtStrategy,
        CommandBus, QueryBus, UsersService, AuthService,
    ],
    exports: [JwtModule],
})
export class AuthModule implements OnModuleInit {
    constructor(
        private readonly query$: QueryBus,
    ) {
    }

    onModuleInit(): any {
        this.query$.register(QueryHandlers);
    }
}
