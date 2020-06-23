import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { TokenDto, TokenIdRequestParamsDto } from '../dtos/tokens.dto';
import { CreateTokenCommand } from '../commands/impl/create-token.command';
import { UpdateTokenCommand } from '../commands/impl/update-token.command';
import { DeleteTokenCommand } from '../commands/impl/delete-token.command';
import { GetTokensQuery, GetTokenTypesQuery } from 'tokens/queries/impl/get-tokens.query';
import { GetTokensByUserIdQuery } from 'tokens/queries/impl/get-tokens-by-userId';
import { FindTokenQuery } from 'tokens/queries/impl/find-token.query';
import { GetTokensByUserIdAndProjectIdQuery } from 'tokens/queries/impl/get-tokens-by-userId-projectId';
import { FindFreeTokenQuery } from 'tokens/queries/impl/find-free-token.query';

@Injectable()
export class TokensService {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ) {
    }

    async createToken(streamId: string, tokenDto: TokenDto) {
        return await this.commandBus.execute(new CreateTokenCommand(streamId, tokenDto));
    }

    async updateToken(streamId: string, tokenDto: TokenDto) {
        return await this.commandBus.execute(new UpdateTokenCommand(streamId, tokenDto));
    }

    async deleteToken(streamId: string, tokenIdDto: TokenIdRequestParamsDto) {
        return await this.commandBus.execute(new DeleteTokenCommand(streamId, tokenIdDto));
    }

    async getTokens(getTokensQuery: GetTokensQuery) {
        const query = new GetTokensQuery();
        Object.assign(query, getTokensQuery);
        return await this.queryBus.execute(query);
    }

    async findTokenTypes(getTokenTypesQuery: GetTokenTypesQuery) {
        const query = new GetTokenTypesQuery();
        Object.assign(query, getTokenTypesQuery);
        return await this.queryBus.execute(query);
    }

    async getTokensByUserId(getTokensByUserIdQuery: GetTokensByUserIdQuery) {
        const query = new GetTokensByUserIdQuery(getTokensByUserIdQuery.userId);
        Object.assign(query, getTokensByUserIdQuery);
        return await this.queryBus.execute(query);
    }

    async getTokensByUserIdAndProjectId(getTokensByUserIdAndProjectIdQuery: GetTokensByUserIdAndProjectIdQuery) {
        const {userId, projectId} = getTokensByUserIdAndProjectIdQuery;
        const query = new GetTokensByUserIdAndProjectIdQuery(userId, projectId);
        Object.assign(query, getTokensByUserIdAndProjectIdQuery);
        return await this.queryBus.execute(query);
    }

    async findOne(findTokenQuery: FindTokenQuery): Promise<TokenDto> {
        const query = new FindTokenQuery(findTokenQuery.id);
        Object.assign(query, findTokenQuery);
        return await this.queryBus.execute(query);
    }

    async findFreeToken(findFreeTokenQuery: FindFreeTokenQuery): Promise<TokenDto> {
        const query = new FindFreeTokenQuery(findFreeTokenQuery.userId);
        Object.assign(query, findFreeTokenQuery);
        return await this.queryBus.execute(query);
    }
}
