import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Roles } from "auth/roles.decorator";
import { CONSTANTS } from "common/constant";
import { TaskService } from "tasks/services/task.service";
import { FindTasksQuery } from "tasks/queries/impl/find-tasks.query";

@Controller('tasks')
@UseGuards(AuthGuard(CONSTANTS.AUTH_JWT))
export class TaskController {
    constructor(
        private readonly taskService: TaskService,
    ) {
    }

    @ApiOperation({tags: ['Get tasks']})
    @ApiResponse({status: 200, description: 'Get tasks.'})
    @Roles([CONSTANTS.ROLE.ADMIN])
    @Get()
    async getTasks(@Query() findTasksQuery: FindTasksQuery) {
        return this.taskService.findTasks(findTasksQuery);
    }
}