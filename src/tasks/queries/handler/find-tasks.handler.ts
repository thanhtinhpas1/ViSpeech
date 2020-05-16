import { Logger } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { TaskDto } from "tasks/dto/task.dto";
import { Repository, getMongoRepository } from "typeorm";
import { FindTasksQuery } from "../impl/find-tasks.query";

@QueryHandler(FindTasksQuery)
export class FindTaskHandler implements IQueryHandler<FindTasksQuery>{
    constructor(
        @InjectRepository(TaskDto)
        private readonly repository: Repository<TaskDto>,
    ) { }
    async execute(query: FindTasksQuery) {
        Logger.log('Async FindTaskHandler', 'FindTaskQuery');
        const { limit, offset, filters, sort } = query;
        let tasks = [];
        try {
            const findOptions = {
                where: {},
                order: {}
            }
            if (filters) {
                if (filters['name']) {
                    findOptions.where['name'] = new RegExp(filters['name'], 'i') 
                }
                if (filters['previousRunStatus']) {
                    findOptions.where['previousRunStatus'] = filters['previousRunStatus']
                }
            }   
            if (sort) {
                findOptions.order[sort.field] = sort.order
            }
            tasks = await (await this.repository.find({ skip: offset || 0, take: limit || 0, ...findOptions }));
            const count = await getMongoRepository(TaskDto).count(findOptions.where);
            return { data: tasks, count };
        } catch (error) {
            Logger.error(error.message, '', 'GetTasksQuery');
        }
    }
}