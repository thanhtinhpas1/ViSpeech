import { CreateTokenHandler } from './create-token.handler';
import { DeleteTokenHandler } from './delete-token.handler';
import { UpdateTokenHandler } from './update-token.handler';

export const CommandHandlers = [
  CreateTokenHandler,
  DeleteTokenHandler,
  UpdateTokenHandler,
];
