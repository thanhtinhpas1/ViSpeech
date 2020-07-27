import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindRequestQuery } from '../impl/find-request.query';
import { RequestDto } from 'requests/dtos/requests.dto';
import { TokenDto } from 'tokens/dtos/tokens.dto';
import { ProjectDto } from 'projects/dtos/projects.dto';

@QueryHandler(FindRequestQuery)
export class FindRequestHandler implements IQueryHandler<FindRequestQuery> {
    constructor(
        @InjectRepository(RequestDto)
        private readonly repository: Repository<RequestDto>,
        @InjectRepository(TokenDto)
        private readonly tokenRepository: Repository<TokenDto>,
        @InjectRepository(ProjectDto)
        private readonly projectRepository: Repository<ProjectDto>
    ) {
    }

    async execute(query: FindRequestQuery): Promise<any> {
        Logger.log('Async FindRequestQuery...', 'FindRequestQuery');
        try {
            const request = await this.repository.findOne({ _id: query.id });
            const token = await this.tokenRepository.findOne({ _id: request.tokenId });
            const project = await this.projectRepository.findOne({ _id: request.projectId });
            const projectName = project ? project.name : '';
            return { ...request, tokenName: token.name, projectName };
        } catch (error) {
            Logger.error(error, '', 'FindRequestQuery');
        }
    }
}
