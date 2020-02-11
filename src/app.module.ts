import { Module, OnModuleInit } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { EventStoreModule } from './core/event-store/event-store.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      // username: 'root',
      // password: 'mysql',
      database: 'vispeech',
      entities: [
        __dirname + '/../**/*.dto{.ts,.js}',
      ],
      synchronize: true,
      logger: 'debug',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'apps/build'),
    }),
    EventStoreModule.forRoot(),
    /** ------------- */
    UsersModule,
  ],
})
export class AppModule implements OnModuleInit {
  async onModuleInit() { }
}
