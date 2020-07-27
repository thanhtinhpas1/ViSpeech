import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { FindTasksQuery } from 'tasks/queries/impl/find-tasks.query';

@Injectable()
export class TaskService {
    constructor(
        private readonly queryBus: QueryBus,
    ) {
    }

    async findTasks(findTasks: FindTasksQuery) {
        const query = new FindTasksQuery();
        Object.assign(query, findTasks);
        return await this.queryBus.execute(query);
    }
}