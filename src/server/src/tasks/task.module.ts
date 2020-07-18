import { Module, OnModuleInit } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportDto } from 'reports/dtos/reports.dto';
import { RequestDto } from 'requests/dtos/requests.dto';
import { QueryHandlers } from 'tasks/queries/handler';
import { TokenDto } from 'tokens/dtos/tokens.dto';
import { ProjectionDto } from '../core/event-store/lib/adapter/projection.dto';
import { TaskController } from './controllers/task.controller';
import { TaskDto } from './dto/task.dto';
import { ConstTaskService } from './services/const-task.service';
import { TaskService } from './services/task.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ReportDto,
            TaskDto,
            TokenDto,
            RequestDto,
            ProjectionDto
        ])
    ],
    controllers: [
        TaskController,
    ],
    providers: [
        ConstTaskService, TaskService,
        QueryBus, ...QueryHandlers,
    ],
})
export class TaskModule implements OnModuleInit {
    constructor(
        private readonly query$: QueryBus,
    ) {
    }

    onModuleInit() {
        this.query$.register(QueryHandlers);
    }
}