import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'auth/auth.module';
import { OrdersModule } from 'orders/orders.module';
import { PermissionsModule } from 'permissions/permissions.module';
import { ProjectsModule } from 'projects/projects.module';
import { ReportsModule } from 'reports/reports.module';
import { RolesModule } from 'roles/roles.module';
import { TaskModule } from 'tasks/task.module';
import { TokensModule } from 'tokens/tokens.module';
import { UsersModule } from 'users/users.module';
import { config } from '../config';
import { RequestModule } from './requests/request.module';

@Module({
    imports: [
        ScheduleModule.forRoot(),
        TypeOrmModule.forRoot({
            ...config.DATABASE,
            useUnifiedTopology: true,
            entities: [__dirname + '/../**/*.dto{.ts,.js}'],
        }),
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
    providers: [
    ]
})
export class AppModule {
}
