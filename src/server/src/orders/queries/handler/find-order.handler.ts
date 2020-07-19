import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindOrderQuery } from '../impl/find-order.query';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDto } from 'orders/dtos/orders.dto';
import { Repository } from 'typeorm';
import { ProjectDto } from 'projects/dtos/projects.dto';

@QueryHandler(FindOrderQuery)
export class FindOrderHandler implements IQueryHandler<FindOrderQuery> {
    constructor(
        @InjectRepository(OrderDto)
        private readonly repository: Repository<OrderDto>,
        @InjectRepository(ProjectDto)
        private readonly projectDtoRepository: Repository<ProjectDto>
    ) {
    }

    async execute(query: FindOrderQuery): Promise<any> {
        Logger.log('Async FindOrderQuery...', 'FindOrderQuery');
        const {id} = query;
        let project = null;

        try {
            const order = await this.repository.findOne({_id: id});
            if (order) {
                project = await this.projectDtoRepository.findOne({_id: order.token.projectId});
                order.token['projectName'] = project.name
            }
            return order
        } catch (error) {
            Logger.error(error.message, '', 'FindOrderQuery');
        }
    }
}
