import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTokensByUserIdQuery } from '../impl/get-tokens-by-userId';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenDto } from 'tokens/dtos/tokens.dto';
import { Repository } from 'typeorm';
import { ProjectDto } from 'projects/dtos/projects.dto';

@QueryHandler(GetTokensByUserIdQuery)
export class GetTokensByUserIdHandler
    implements IQueryHandler<GetTokensByUserIdQuery> {
    constructor(
        @InjectRepository(TokenDto)
        private readonly repository: Repository<TokenDto>,
        @InjectRepository(ProjectDto)
        private readonly projectDtoRepository: Repository<ProjectDto>
    ) {
    }

    async execute(query: GetTokensByUserIdQuery): Promise<any> {
        Logger.log('Async GetTokensByUserIdQuery...', 'GetTokensByUserIdQuery');
        const {userId, offset, limit} = query;
        const result = [];
        try {
            const findOptions = {where: {userId}}
            const tokens = await this.repository.find({skip: offset || 0, take: limit || 0, ...findOptions});
            for (const token of tokens) {
                const project = await this.projectDtoRepository.findOne({_id: token.projectId});
                const projectName = project ? project.name : '';
                result.push({...token, projectName});
            }

            const count = await this.repository.count(findOptions.where);
            return {data: result, count};
        } catch (error) {
            Logger.error(error, '', 'GetTokensByUserIdQuery');
        }
    }
}
