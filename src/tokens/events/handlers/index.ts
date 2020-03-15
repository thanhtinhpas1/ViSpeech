import { TokenCreatedHandler, TokenCreatedFailHandler, TokenCreatedSuccessHandler } from "./token-created.handler";
import { TokenUpdatedHandler } from "./token-updated.handler";
import { TokenDeletedHandler } from "./token-deleted.handler";
import { TokenWelcomedHandler } from "./token-welcomed.handler";
import { FreeTokenCreatedHandler, FreeTokenCreatedSuccessHandler, FreeTokenCreatedFailedHandler } from "./free-token-created.handler";
import { OrderedTokenCreatedHandler, OrderedTokenCreatedSuccessHandler, OrderedTokenCreatedFailedHandler } from "./ordered-token-created.handler";

export const EventHandlers = [
  // create
  TokenCreatedHandler,
  TokenCreatedSuccessHandler,
  TokenCreatedFailHandler,

  TokenUpdatedHandler,
  TokenDeletedHandler,
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
