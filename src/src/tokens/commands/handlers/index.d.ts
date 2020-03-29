import { CreateFreeTokenHandler, CreateOrderedTokenHandler, CreateTokenHandler } from './create-token.handler';
import { DeleteTokenByUserIdHandler, DeleteTokenHandler } from './delete-token.handler';
import { UpdateTokenHandler } from './update-token.handler';
import { WelcomeTokenHandler } from './welcome-token.handler';
export declare const CommandHandlers: (typeof CreateTokenHandler | typeof CreateFreeTokenHandler | typeof CreateOrderedTokenHandler | typeof DeleteTokenHandler | typeof DeleteTokenByUserIdHandler | typeof UpdateTokenHandler | typeof WelcomeTokenHandler)[];
