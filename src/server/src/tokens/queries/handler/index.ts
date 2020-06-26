import { GetTokensHandler, GetTokenTypesHandler } from './get-tokens.handler';
import { GetTokensByUserIdHandler } from './get-tokens-by-userId.handler';
import { FindTokenHandler } from './find-token.handler';
import { GetTokensByUserIdAndProjectIdHandler } from './get-tokens-by-userId-projectId.handler';
import { FindFreeTokenHandler } from './find-free-token.handler';

export const QueryHandlers = [
    GetTokensHandler,
    GetTokenTypesHandler,
    GetTokensByUserIdHandler,
    GetTokensByUserIdAndProjectIdHandler,
    FindTokenHandler,
    FindFreeTokenHandler,
];
