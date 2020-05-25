import {CreateFreeTokenHandler, CreateOrderedTokenHandler, CreateTokenHandler} from './create-token.handler';
import {DeleteTokenHandler} from './delete-token.handler';
import {UpdateTokenHandler} from './update-token.handler';
import {WelcomeTokenHandler} from './welcome-token.handler';
import { DeleteTokenByProjectIdHandler } from './delete-token-by-projectId.handler';
import { DeleteTokenByUserIdHandler } from './delete-token-by-userId.handler';

export const CommandHandlers = [
    CreateTokenHandler,
    CreateFreeTokenHandler,
    CreateOrderedTokenHandler,
    DeleteTokenHandler,
    DeleteTokenByUserIdHandler,
    DeleteTokenByProjectIdHandler,
    UpdateTokenHandler,
    WelcomeTokenHandler,
];
