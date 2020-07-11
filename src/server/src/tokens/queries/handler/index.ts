import { GetTotalTokensHandler } from 'tokens/queries/handler/get-total-tokens.handler';
import { FindFreeTokenHandler } from './find-free-token.handler';
import { FindTokenHandler } from './find-token.handler';
import { GetTokensByUserIdAndProjectIdHandler } from './get-tokens-by-userId-projectId.handler';
import { GetTokensByUserIdHandler } from './get-tokens-by-userId.handler';
import { GetTokensHandler, GetTokenTypesHandler } from './get-tokens.handler';

export const QueryHandlers = [
    GetTokensHandler,
    GetTokenTypesHandler,
    GetTokensByUserIdHandler,
    GetTokensByUserIdAndProjectIdHandler,
    FindTokenHandler,
    FindFreeTokenHandler,
    GetTotalTokensHandler,
];
