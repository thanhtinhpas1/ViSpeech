import { Module, OnModuleInit } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { EventStoreModule } from './core/event-store/event-store.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'auth/auth.module';
import { HomeController } from 'app.controllers';

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
      useUnifiedTopology: true,
      synchronize: true,
      logger: 'debug',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'apps/build'),
    }),
    EventStoreModule.forRoot(),
    /** ------------- */
    UsersModule,
    AuthModule
  ],
  controllers: [HomeController]
})
export class AppModule implements OnModuleInit {
  async onModuleInit() { }
}
