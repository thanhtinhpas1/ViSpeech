import { Module, OnModuleInit } from '@nestjs/common';
import { EventStoreModule } from './core/event-store/event-store.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UsersService } from 'users/services/users.service';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '34.87.124.118',
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
  ],
  /** -------- ROLE_PERMISSION -------- */
  providers: [
    UsersService,
    CommandBus,
    QueryBus,
  ],
  exports: [UsersService]
})
export class AppModule implements OnModuleInit {
  async onModuleInit() { }
}
