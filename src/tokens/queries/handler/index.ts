import {GetTokensHandler, GetTokenTypesHandler} from './get-tokens.handler';
import {GetTokensByUserIdHandler} from './get-tokens-by-userId.handler';
import {FindTokenHandler} from './find-token.handler';
import { GetTokensByUserIdAndProjectIdHandler } from './get-tokens-by-userId-projectId.handler';

export const QueryHandlers = [
    GetTokensHandler,
    GetTokenTypesHandler,
    GetTokensByUserIdHandler,
    GetTokensByUserIdAndProjectIdHandler,
    FindTokenHandler
];
