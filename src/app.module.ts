import { Module, OnModuleInit } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { EventStoreModule } from './core/event-store/event-store.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db',
      port: 3306,
      username: 'root',
      password: 'mysql',
      database: 'vispeech',
      entities: [
        __dirname + '/../**/*.dto{.ts,.js}',
      ],
      synchronize: true,
      logger: 'debug',
    }),
    EventStoreModule.forRoot(),
    /** ------------- */
    UsersModule,
  ],
})
export class AppModule implements OnModuleInit {
  async onModuleInit() { }
}
