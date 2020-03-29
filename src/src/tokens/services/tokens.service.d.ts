import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { TokenDto, TokenIdRequestParamsDto } from '../dtos/tokens.dto';
import { GetTokensQuery, GetTokenTypesQuery } from 'tokens/queries/impl/get-tokens.query';
import { GetTokensByUserIdQuery } from 'tokens/queries/impl/get-tokens-by-userId';
import { FindTokenQuery } from 'tokens/queries/impl/find-token.query';
export declare class TokensService {
    private readonly commandBus;
    private readonly queryBus;
    constructor(commandBus: CommandBus, queryBus: QueryBus);
    createToken(streamId: string, tokenDto: TokenDto): Promise<any>;
    updateToken(streamId: string, tokenDto: TokenDto): Promise<any>;
    deleteToken(streamId: string, tokenIdDto: TokenIdRequestParamsDto): Promise<any>;
    getTokens(getTokensQuery: GetTokensQuery): Promise<import("@nestjs/cqrs").IQueryResult>;
    findTokenTypes(getTokenTypesQuery: GetTokenTypesQuery): Promise<import("@nestjs/cqrs").IQueryResult>;
    getTokensByUserId(getTokensByUserIdQuery: GetTokensByUserIdQuery): Promise<import("@nestjs/cqrs").IQueryResult>;
    findOne(findTokenQuery: FindTokenQuery): Promise<TokenDto>;
}
