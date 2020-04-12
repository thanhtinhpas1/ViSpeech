import { Module } from "@nestjs/common";
import { ConstTaskService } from "./services/const-task.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReportDto } from "reports/dtos/reports.dto";
import { TaskDto } from "./dto/task.dto";
import { RequestDto } from "requests/dtos/requests.dto";
import { TokenDto } from "tokens/dtos/tokens.dto";

@Module({
    imports: [
        TypeOrmModule.forFeature([ReportDto, TaskDto, TokenDto, RequestDto])
    ],
    providers: [
        ConstTaskService,
    ],
})
export class TaskModule {
}