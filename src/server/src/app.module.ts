import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from '../config';
import { ScheduleModule } from "@nestjs/schedule";
import { UsersModule } from "./users/users.module";
import { EventStoreModule } from "./core/event-store/lib";
import { AuthModule } from "./auth/auth.module";
import { TokensModule } from "./tokens/tokens.module";
import { OrdersModule } from "./orders/orders.module";
import { RolesModule } from "./roles/roles.module";
import { ReportsModule } from "./reports/reports.module";
import { ProjectsModule } from "./projects/projects.module";
import { PermissionsModule } from "./permissions/permissions.module";
import { RequestModule } from "./requests/request.module";
import { TaskModule } from "./tasks/task.module";

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
        AuthModule,
        TokensModule,
        OrdersModule,
        RolesModule,
        ReportsModule,
        ProjectsModule,
        PermissionsModule,
        RequestModule,
        TaskModule,
    ],
})
export class AppModule {
}
