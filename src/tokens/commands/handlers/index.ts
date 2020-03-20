import { CreateTokenHandler, CreateFreeTokenHandler, CreateOrderedTokenHandler } from "./create-token.handler";
import { DeleteTokenHandler, DeleteTokenByUserIdHandler } from "./delete-token.handler";
import { UpdateTokenHandler } from "./update-token.handler";
import { WelcomeTokenHandler } from "./welcome-token.handler";

export const CommandHandlers = [
  CreateTokenHandler,
  CreateFreeTokenHandler,
  CreateOrderedTokenHandler,
  DeleteTokenHandler,
  DeleteTokenByUserIdHandler,
  UpdateTokenHandler,
  WelcomeTokenHandler,
];
