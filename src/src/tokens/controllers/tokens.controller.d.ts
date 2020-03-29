import { FindTokenQuery } from 'tokens/queries/impl/find-token.query';
import { GetTokensByUserIdQuery } from 'tokens/queries/impl/get-tokens-by-userId';
import { GetTokensQuery, GetTokenTypesQuery } from 'tokens/queries/impl/get-tokens.query';
import { TokenDto, TokenIdRequestParamsDto } from '../dtos/tokens.dto';
import { TokensService } from '../services/tokens.service';
export declare class TokensController {
    private readonly tokensService;
    constructor(tokensService: TokensService);
    createToken(tokenDto: TokenDto): Promise<TokenDto>;
    updateToken(tokenIdDto: TokenIdRequestParamsDto, tokenDto: TokenDto): Promise<any>;
    deleteToken(tokenIdDto: TokenIdRequestParamsDto): Promise<any>;
    getTokens(getTokensQuery: GetTokensQuery): Promise<import("@nestjs/cqrs").IQueryResult>;
    getTokensByUserId(getTokensByUserIdQuery: GetTokensByUserIdQuery): Promise<import("@nestjs/cqrs").IQueryResult>;
    findOneToken(findTokenQuery: FindTokenQuery): Promise<TokenDto>;
    getTokenTypes(getTokenTypesQuery: GetTokenTypesQuery): Promise<import("@nestjs/cqrs").IQueryResult>;
}
