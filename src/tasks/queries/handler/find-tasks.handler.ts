import { Logger } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { TaskDto } from "tasks/dto/task.dto";
import { Repository } from "typeorm";
import { FindTasksQuery } from "../impl/find-tasks.query";

@QueryHandler(FindTasksQuery)
export class FindTaskHandler implements IQueryHandler<FindTasksQuery>{
    constructor(
        @InjectRepository(TaskDto)
        private readonly repository: Repository<TaskDto>,
    ) { }
    async execute(query: FindTasksQuery) {
        Logger.log('Async FindTaskHandler', 'FindTaskQuery');
        const { limit, offset } = query;
        let tasks = [];
        try {
            tasks = limit != null && offset != null ?
                await this.repository.find({ skip: offset, take: limit }) :
                await this.repository.find();
            const count = await this.repository.count();
            return { data: tasks, count };
        } catch (error) {
            Logger.error(error.message, '', 'GetTasksQuery');
        }
    }
}