import {TokenCreatedFailedHandler, TokenCreatedHandler, TokenCreatedSuccessHandler} from './token-created.handler';
import {TokenUpdatedHandler} from './token-updated.handler';
import {TokenDeletedByUserIdHandler, TokenDeletedHandler} from './token-deleted.handler';
import {TokenWelcomedHandler} from './token-welcomed.handler';
import {FreeTokenCreatedFailedHandler, FreeTokenCreatedHandler, FreeTokenCreatedSuccessHandler} from './free-token-created.handler';
import {OrderedTokenCreatedFailedHandler, OrderedTokenCreatedHandler, OrderedTokenCreatedSuccessHandler} from './ordered-token-created.handler';

export const EventHandlers = [
    // create
    TokenCreatedHandler,
    TokenCreatedSuccessHandler,
    TokenCreatedFailedHandler,

    TokenUpdatedHandler,
    TokenDeletedHandler,
    TokenDeletedByUserIdHandler,
    TokenWelcomedHandler,

    // free token
    FreeTokenCreatedHandler,
    FreeTokenCreatedSuccessHandler,
    FreeTokenCreatedFailedHandler,

    // ordered token
    OrderedTokenCreatedHandler,
    OrderedTokenCreatedSuccessHandler,
    OrderedTokenCreatedFailedHandler
];
