import { TokenCreatedHandler, TokenCreatedFailHandler } from "./token-created.handler";
import { TokenUpdatedHandler } from "./token-updated.handler";
import { TokenDeletedHandler } from "./token-deleted.handler";
import { TokenWelcomedHandler } from "./token-welcomed.handler";

export const EventHandlers = [
  TokenCreatedHandler,
  TokenCreatedFailHandler,
  TokenUpdatedHandler,
  TokenDeletedHandler,
  TokenWelcomedHandler
];
