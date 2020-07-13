import { TokenCreatedFailedHandler, TokenCreatedHandler, TokenCreatedSuccessHandler } from './token-created.handler';
import { TokenUpdatedFailedHandler, TokenUpdatedHandler, TokenUpdatedSuccessHandler } from './token-updated.handler';
import { TokenDeletedFailedHandler, TokenDeletedHandler, TokenDeletedSuccessHandler } from './token-deleted.handler';
import { TokenWelcomedHandler } from './token-welcomed.handler';
import { FreeTokenCreatedFailedHandler, FreeTokenCreatedHandler, FreeTokenCreatedSuccessHandler } from './free-token-created.handler';
import { OrderedTokenCreatedFailedHandler, OrderedTokenCreatedHandler, OrderedTokenCreatedSuccessHandler } from './ordered-token-created.handler';
import {
    TokenDeletedByUserIdFailedHandler, TokenDeletedByUserIdHandler, TokenDeletedByUserIdSuccessHandler
} from './token-deleted-by-userId.handler';
import {
    TokenDeletedByProjectIdFailedHandler, TokenDeletedByProjectIdHandler, TokenDeletedByProjectIdSuccessHandler
} from './token-deleted-by-projectId.handler';
import { TokenUpgradedFailedHandler, TokenUpgradedHandler, TokenUpgradedSuccessHandler } from './token-upgraded.handler';

export const EventHandlers = [
    // create free token
    FreeTokenCreatedHandler,
    FreeTokenCreatedSuccessHandler,
    FreeTokenCreatedFailedHandler,

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
    TokenUpgradedFailedHandler,
];
