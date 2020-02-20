import { Module, OnModuleInit } from '@nestjs/common';
import { EventStoreModule } from './core/event-store/event-store.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UsersService } from 'users/services/users.service';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UsersModule } from 'users/users.module';
import { AuthModule } from 'auth/auth.module';
import { TokensModule } from 'tokens/tokens.module';
import { OrdersModule } from 'orders/orders.module';
import { RolesModule } from 'roles/roles.module';
import { AuthService } from 'auth/auth.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'mysql',
      database: 'vispeech',
      entities: [
        __dirname + '/../**/*.dto{.ts,.js}',
      ],
      extra: { "charset": "utf8mb4" },
      synchronize: true,
      logger: 'debug',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'apps/build'),
    }),
    EventStoreModule.forRoot(),
    /** ------------- */
    UsersModule,
    AuthModule,
    TokensModule,
    OrdersModule,
    RolesModule
  ],
  /** -------- ROLE_PERMISSION -------- */
  providers: [
    UsersService,
    CommandBus,
    QueryBus,
  ],
  exports: []
})
export class AppModule implements OnModuleInit {
  async onModuleInit() { }
}
