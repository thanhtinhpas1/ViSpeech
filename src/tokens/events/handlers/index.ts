import { TokenCreatedHandler, TokenCreatedFailHandler, TokenCreatedSuccessHandler } from "./token-created.handler";
import { TokenUpdatedHandler } from "./token-updated.handler";
import { TokenDeletedHandler } from "./token-deleted.handler";
import { TokenWelcomedHandler } from "./token-welcomed.handler";
import { FreeTokenCreatedHandler, FreeTokenCreatedSuccessHandler, FreeTokenCreatedFailHandler } from "./free-token-created.handler";
import { OrderedTokenCreatedHandler, OrderedTokenCreatedSuccessHandler, OrderedTokenCreatedFailHandler } from "./ordered-token-created.handler";

export const EventHandlers = [
  TokenCreatedHandler,
  TokenCreatedSuccessHandler,
  TokenCreatedFailHandler,
  TokenUpdatedHandler,
  TokenDeletedHandler,
  TokenWelcomedHandler,
  // free token
  FreeTokenCreatedHandler,
  FreeTokenCreatedSuccessHandler,
  FreeTokenCreatedFailHandler,
  // ordered token
  OrderedTokenCreatedHandler,
  OrderedTokenCreatedSuccessHandler,
  OrderedTokenCreatedFailHandler
];
