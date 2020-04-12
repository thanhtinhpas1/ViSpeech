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
        private readonly taskRepository: Repository<TaskDto>,
    ) { }
    async execute(query: FindTasksQuery) {
        Logger.log('Async FindTaskHandler', 'FindTaskQuery');
        const { limit, offset } = query;
        let tasks = [];
        try {
            tasks = limit && offset ?
                await this.taskRepository.find({ skip: offset, take: limit }) :
                await this.taskRepository.find();
            return tasks;
        } catch (error) {
            Logger.error(error.message, '', 'GetTasksQuery');
        }
    }
}