import {TokenCreatedFailedHandler, TokenCreatedHandler, TokenCreatedSuccessHandler} from './token-created.handler';
import {TokenUpdatedHandler, TokenUpdatedSuccessHandler, TokenUpdatedFailedHandler} from './token-updated.handler';
import {TokenDeletedByUserIdHandler, TokenDeletedHandler, TokenDeletedSuccessHandler, TokenDeletedFailedHandler, TokenDeletedByUserIdSuccessHandler, TokenDeletedByUserIdFailedHandler} from './token-deleted.handler';
import {TokenWelcomedHandler} from './token-welcomed.handler';
import {FreeTokenCreatedFailedHandler, FreeTokenCreatedHandler, FreeTokenCreatedSuccessHandler} from './free-token-created.handler';
import {OrderedTokenCreatedFailedHandler, OrderedTokenCreatedHandler, OrderedTokenCreatedSuccessHandler} from './ordered-token-created.handler';

export const EventHandlers = [
    // create
    TokenCreatedHandler,
    TokenCreatedSuccessHandler,
    TokenCreatedFailedHandler,

    // update
    TokenUpdatedHandler,
    TokenUpdatedSuccessHandler,
    TokenUpdatedFailedHandler,

    // delete
    TokenDeletedHandler,
    TokenDeletedSuccessHandler,
    TokenDeletedFailedHandler,

    // delete by userId
    TokenDeletedByUserIdHandler,
    TokenDeletedByUserIdSuccessHandler,
    TokenDeletedByUserIdFailedHandler,

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
