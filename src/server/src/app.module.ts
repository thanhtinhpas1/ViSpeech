import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from '../config';
import { AuthModule } from './auth/auth.module';
import { EventStoreModule } from './core/event-store/lib';
import { MonitorsModule } from './monitors/monitors.module';
import { OrdersModule } from './orders/orders.module';
import { PermissionsModule } from './permissions/permissions.module';
import { ProjectsModule } from './projects/projects.module';
import { ReportsModule } from './reports/reports.module';
import { RequestModule } from './requests/request.module';
import { RolesModule } from './roles/roles.module';
import { TaskModule } from './tasks/task.module';
import { TokensModule } from './tokens/tokens.module';
import { UsersModule } from './users/users.module';

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
        ProjectsModule,
        TokensModule,
        OrdersModule,
        RolesModule,
        ReportsModule,
        PermissionsModule,
        RequestModule,
        TaskModule,
        MonitorsModule,
    ],
    providers: []
})
export class AppModule {
}
