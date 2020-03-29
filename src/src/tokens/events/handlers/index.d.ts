import { TokenCreatedHandler, TokenCreatedSuccessHandler } from './token-created.handler';
import { TokenUpdatedHandler } from './token-updated.handler';
import { TokenDeletedByUserIdHandler, TokenDeletedHandler } from './token-deleted.handler';
import { TokenWelcomedHandler } from './token-welcomed.handler';
import { FreeTokenCreatedHandler } from './free-token-created.handler';
import { OrderedTokenCreatedHandler } from './ordered-token-created.handler';
export declare const EventHandlers: (typeof TokenCreatedHandler | typeof TokenCreatedSuccessHandler | typeof TokenUpdatedHandler | typeof TokenDeletedHandler | typeof TokenDeletedByUserIdHandler | typeof TokenWelcomedHandler | typeof FreeTokenCreatedHandler | typeof OrderedTokenCreatedHandler)[];
