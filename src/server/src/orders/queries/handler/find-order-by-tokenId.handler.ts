import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDto } from 'orders/dtos/orders.dto';
import { Repository } from 'typeorm';
import { FindOrderByTokenIdQuery } from '../impl/find-order-by-tokenId.query';
import { ProjectDto } from 'projects/dtos/projects.dto';

@QueryHandler(FindOrderByTokenIdQuery)
export class FindOrderByTokenIdHandler implements IQueryHandler<FindOrderByTokenIdQuery> {
    constructor(
        @InjectRepository(OrderDto)
        private readonly repository: Repository<OrderDto>,
        @InjectRepository(ProjectDto)
        private readonly projectDtoRepository: Repository<ProjectDto>
    ) {
    }

    async execute(query: FindOrderByTokenIdQuery): Promise<any> {
        Logger.log('Async FindOrderByTokenIdQuery...', 'FindOrderByTokenIdQuery');
        const { tokenId } = query;
        let project = null;

        try {
            const order = await this.repository.find({ where: { 'token._id': tokenId }, order: { createdDate: 'DESC' } });
            if (order.length > 0) {
                project = await this.projectDtoRepository.findOne({ _id: order[0].token.projectId });
                // TODO: verify why we need create new field here
                order[0].token['projectName'] = project.name;
            }
            return order[0];
        } catch (error) {
            Logger.error(error.message, '', 'FindOrderByTokenIdQuery');
        }
    }
}
