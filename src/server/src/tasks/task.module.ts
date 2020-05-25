import { Module, OnModuleInit } from "@nestjs/common";
import { ConstTaskService } from "./services/const-task.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReportDto } from "reports/dtos/reports.dto";
import { TaskDto } from "./dto/task.dto";
import { RequestDto } from "requests/dtos/requests.dto";
import { TokenDto } from "tokens/dtos/tokens.dto";
import { QueryBus } from "@nestjs/cqrs";
import { QueryHandlers } from "tasks/queries/handler";
import { TaskController } from "./controllers/task.controller";
import { TaskService } from "./services/task.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([ReportDto, TaskDto, TokenDto, RequestDto])
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
    ) { }
    onModuleInit() {
        this.query$.register(QueryHandlers);
    }
}