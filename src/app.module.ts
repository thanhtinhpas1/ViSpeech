import { Module, OnModuleInit } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TokensModule } from './tokens/tokens.module';
import { OrdersModule } from './orders/orders.module';
import { EventStoreModule } from './core/event-store/event-store.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from 'auth/auth.module';
import { HomeController } from 'app.controllers';
import { RolesModule } from 'roles/roles.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '13.230.185.171',
      port: 3306,
      username: 'root',
      password: 'mysql',
      database: 'vispeech',
      entities: [
        __dirname + '/../**/*.dto{.ts,.js}',
      ],
      extra: {"charset": "utf8mb4"},
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
  controllers: [HomeController]
})
export class AppModule implements OnModuleInit {
  async onModuleInit() { }
}
