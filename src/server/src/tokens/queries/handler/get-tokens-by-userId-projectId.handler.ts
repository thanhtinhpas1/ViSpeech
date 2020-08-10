import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenDto } from 'tokens/dtos/tokens.dto';
import { getMongoRepository, Repository } from 'typeorm';
import { GetTokensByUserIdAndProjectIdQuery } from '../impl/get-tokens-by-userId-projectId';
import { Utils } from 'utils';
import { TokenTypeDto } from 'tokens/dtos/token-types.dto';
import { PermissionDto } from 'permissions/dtos/permissions.dto';
import { CONSTANTS } from 'common/constant';

@QueryHandler(GetTokensByUserIdAndProjectIdQuery)
export class GetTokensByUserIdAndProjectIdHandler
    implements IQueryHandler<GetTokensByUserIdAndProjectIdQuery> {
    constructor(
        @InjectRepository(TokenDto)
        private readonly repository: Repository<TokenDto>,
        @InjectRepository(TokenTypeDto)
        private readonly tokenTypeDtoRepository: Repository<TokenTypeDto>,
        @InjectRepository(PermissionDto)
        private readonly permissionDtoRepository: Repository<PermissionDto>
    ) {
    }

    async execute(query: GetTokensByUserIdAndProjectIdQuery): Promise<any> {
        Logger.log('Async GetTokensByUserIdAndProjectIdQuery...', 'GetTokensByUserIdAndProjectIdQuery');
        const { userId, projectId, assigneeId, offset, limit, filters, sort } = query;
        let tokens = [];
        let permission = null;

        try {
            const findOptions = {
                where: { userId, projectId },
                order: {}
            };

            if (assigneeId) {
                permission = await this.permissionDtoRepository.findOne({ projectId, assignerId: userId, assigneeId,
                    status: CONSTANTS.STATUS.ACCEPTED });
                if (permission) {
                    const tokenIds = permission.permissions.map(p => p.tokenId);
                    findOptions.where['_id'] = { $in: [...tokenIds] };
                }
            }

            if (filters) {
                if (filters['name']) {
                    findOptions.where['name'] = new RegExp(filters['name'], 'i');
                }
                if (filters['tokenType']) {
                    const tokenTypes = await this.tokenTypeDtoRepository.find({ name: filters['tokenType'] });
                    const tokenTypeIds = tokenTypes.map(tokenType => tokenType._id);
                    findOptions.where['tokenTypeId'] = { $in: [...tokenTypeIds] };
                }
                if (filters['isValid']) {
                    findOptions.where['isValid'] = Utils.convertToBoolean(filters['isValid']);
                }
                if (assigneeId && filters['status'] && [CONSTANTS.STATUS.EXPIRED, CONSTANTS.STATUS.UNEXPIRED].includes(filters['status'])) {
                    // status of token: expired or not
                    findOptions.where['_id'] = { $in: [] };
                    const expiresIn = filters['status'] === CONSTANTS.STATUS.EXPIRED ? { $lt: Date.now() } : { $gt: Date.now() };
                    const permission = await this.permissionDtoRepository.findOne({ where: { projectId, assignerId: userId, assigneeId,
                        status: CONSTANTS.STATUS.ACCEPTED, expiresIn }});
                    if (permission) {
                        const tokenIds = permission.permissions.map(p => p.tokenId);
                        findOptions.where['_id'] = { $in: [...tokenIds] };
                    }
                }
            }
            if (sort) {
                const sortField = Utils.getCorrectSortField(sort.field);
                findOptions.order[sortField] = sort.order;
            }

            tokens = await this.repository.find({ skip: offset || 0, take: limit || 0, ...findOptions });

            if (assigneeId) {
                for (const token of tokens) {
                    token.value = permission.permissions.find(p => p.tokenId === token._id)?.assigneeToken;
                    token['status'] = Utils.tokenExpired(permission.expiresIn) ? CONSTANTS.STATUS.EXPIRED : CONSTANTS.STATUS.UNEXPIRED;
                }
            }

            const count = await getMongoRepository(TokenDto).count(findOptions.where);
            return { data: tokens, count };
        } catch (error) {
            Logger.error(error, '', 'GetTokensByUserIdAndProjectIdQuery');
        }
    }
}
