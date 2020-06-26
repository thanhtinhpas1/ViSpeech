import {TokenCreatedFailedHandler, TokenCreatedHandler, TokenCreatedSuccessHandler} from './token-created.handler';
import {TokenUpdatedHandler, TokenUpdatedSuccessHandler, TokenUpdatedFailedHandler} from './token-updated.handler';
import {TokenDeletedHandler, TokenDeletedSuccessHandler, TokenDeletedFailedHandler} from './token-deleted.handler';
import {TokenWelcomedHandler} from './token-welcomed.handler';
import {FreeTokenCreatedFailedHandler, FreeTokenCreatedHandler, FreeTokenCreatedSuccessHandler} from './free-token-created.handler';
import {OrderedTokenCreatedFailedHandler, OrderedTokenCreatedHandler, OrderedTokenCreatedSuccessHandler} from './ordered-token-created.handler';
import { TokenDeletedByUserIdHandler, TokenDeletedByUserIdSuccessHandler, TokenDeletedByUserIdFailedHandler } from './token-deleted-by-userId.handler';
import { TokenDeletedByProjectIdHandler, TokenDeletedByProjectIdSuccessHandler, TokenDeletedByProjectIdFailedHandler } from './token-deleted-by-projectId.handler';
import { TokenUpgradedHandler, TokenUpgradedSuccessHandler, TokenUpgradedFailedHandler } from './token-upgraded.handler';

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

    // delete by projectId
    TokenDeletedByProjectIdHandler,
    TokenDeletedByProjectIdSuccessHandler,
    TokenDeletedByProjectIdFailedHandler,

    TokenWelcomedHandler,

    // free token
    FreeTokenCreatedHandler,
    FreeTokenCreatedSuccessHandler,
    FreeTokenCreatedFailedHandler,

    // ordered token
    OrderedTokenCreatedHandler,
    OrderedTokenCreatedSuccessHandler,
    OrderedTokenCreatedFailedHandler,

    // upgrade token
    TokenUpgradedHandler,
    TokenUpgradedSuccessHandler,
    TokenUpgradedFailedHandler
];
