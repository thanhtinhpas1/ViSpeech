import { CreateTokenHandler, CreateUserTokenHandler } from "./create-token.handler";
import { DeleteTokenHandler } from "./delete-token.handler";
import { UpdateTokenHandler } from "./update-token.handler";
import { WelcomeTokenHandler } from "./welcome-token.handler";

export const CommandHandlers = [
  CreateTokenHandler,
  CreateUserTokenHandler,
  DeleteTokenHandler,
  UpdateTokenHandler,
  WelcomeTokenHandler
];
