import { GetTokensHandler } from "./get-tokens.handler";
import { GetTokensByUserIdHandler } from "./get-tokens-by-userId";
import { FindTokenHandler } from "./find-token.handler";

export const QueryHandlers = [GetTokensHandler, GetTokensByUserIdHandler, FindTokenHandler];
