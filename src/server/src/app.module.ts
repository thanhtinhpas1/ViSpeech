import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from '../config';
import { ScheduleModule } from "@nestjs/schedule";
import { UsersModule } from "./users/users.module";
import { EventStoreModule } from "./core/event-store/lib";

@Module({
    imports: [
        ScheduleModule.forRoot(),
        TypeOrmModule.forRoot({
            ...config.DATABASE,
            useUnifiedTopology: true,
            entities: [__dirname + '/../**/*.dto{.ts,.js}'],
        }),
        EventStoreModule.register(config.EVENTSTORE),
        UsersModule,
        // AuthModule,
        // TokensModule,
        // OrdersModule,
        // RolesModule,
        // ReportsModule,
        // ProjectsModule,
        // PermissionsModule,
        // RequestModule,
        // TaskModule,
    ],
})
export class AppModule {
}
