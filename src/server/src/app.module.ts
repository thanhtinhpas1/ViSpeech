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
            poolSize: 200,
            useUnifiedTopology: true,
            entities: [__dirname + '/../**/*.dto{.ts,.js}'],
        }),
        EventStoreModule.register({
            tcpEndpoint: {
                host: process.env.EVENT_STORE_HOSTNAME || '0.0.0.0',
                port: 1113,
            },
            options: {
                maxRetries: 10, // Optional
                maxReconnections: 100,  // Optional
                reconnectionDelay: 5000,  // Optional
                heartbeatInterval: 1000,  // Optional
                heartbeatTimeout: 500,  // Optional
                verboseLogging: true,
                maxDiscoverAttempts: 100000,
                failOnNoServerResponse: true,
                defaultUserCredentials: {
                    username: process.env.EVENT_STORE_CREDENTIALS_USERNAME || 'admin',
                    password: process.env.EVENT_STORE_CREDENTIALS_PASSWORD || 'changeit',
                },
            },
        }),
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
