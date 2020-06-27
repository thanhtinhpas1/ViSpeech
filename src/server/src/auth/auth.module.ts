import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'auth/roles.guard';
import { AuthController } from './auth.controllers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandBus, EventBus } from '@nestjs/cqrs';
import { UsersModule } from '../users/users.module';
import { config } from '../../config';
import { AuthService } from './auth.service';
import { UserDto } from '../users/dtos/users.dto';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { FacebookStrategy } from './facebook.strategy';
import { GoogleStrategy } from './google.strategy';
import { RoleDto } from 'roles/dtos/roles.dto';
import { EventStoreModule } from 'core/event-store/event-store.module';
import { CreateUserHandler, CreateUserStartHandler } from 'users/commands/handlers/create-user.handler';
import { CreateFreeTokenHandler } from 'tokens/commands/handlers/create-token.handler';
import { EventStore } from 'core/event-store/event-store';
import { TokensModule } from 'tokens/tokens.module';

@Module({
    imports: [
        JwtModule.register(config.JWT),
        TypeOrmModule.forFeature([UserDto, RoleDto]),
        forwardRef(() => UsersModule),
        PassportModule,
        EventStoreModule.forFeature(),
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
        EventBus, EventStore, CommandBus
    ],
    exports: [JwtModule, AuthService]
})
export class AuthModule {
    constructor(
        private readonly command$: CommandBus,
        private readonly event$: EventBus,
        private readonly eventStore: EventStore
    ) {
    }

    onModuleInit() {
        const { UserCreatedEvent, UserCreatedSuccessEvent, UserCreatedFailedEvent } = UsersModule.eventHandlers;
        const { FreeTokenCreatedEvent, FreeTokenCreatedSuccessEvent, FreeTokenCreatedFailedEvent } = TokensModule.eventHandlers;
        this.eventStore.setEventHandlers({ UserCreatedEvent, UserCreatedSuccessEvent, UserCreatedFailedEvent, FreeTokenCreatedEvent,
            FreeTokenCreatedSuccessEvent, FreeTokenCreatedFailedEvent });
        this.eventStore.bridgeEventsTo((this.event$ as any).subject$);
        this.event$.publisher = this.eventStore;
        /** ------------ */
        this.command$.register([CreateUserStartHandler, CreateUserHandler, CreateFreeTokenHandler]);
    }
}