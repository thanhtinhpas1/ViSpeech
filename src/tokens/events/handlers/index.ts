import { TokenCreatedHandler } from "./token-created.handler";
import { TokenUpdatedHandler } from "./token-updated.handler";
import { TokenDeletedHandler } from "./token-deleted.handler";

export const EventHandlers = [
  TokenCreatedHandler,
  TokenUpdatedHandler,
  TokenDeletedHandler
];
