import { CreateFreeTokenHandler, CreateOrderedTokenHandler, CreateTokenHandler } from './create-token.handler';
import { DeleteTokenHandler } from './delete-token.handler';
import { UpdateTokenHandler } from './update-token.handler';
import { WelcomeTokenHandler } from './welcome-token.handler';
import { DeleteTokenByProjectIdHandler } from './delete-token-by-projectId.handler';
import { DeleteTokenByUserIdHandler } from './delete-token-by-userId.handler';
import { UpgradeTokenHandler } from './upgrade-token.handler';
import { CreateUpgradeTokenOrderHandler } from './create-upgrade-token-order.handler';

export const CommandHandlers = [
    CreateTokenHandler,
    CreateFreeTokenHandler,
    CreateOrderedTokenHandler,
    DeleteTokenHandler,
    DeleteTokenByUserIdHandler,
    DeleteTokenByProjectIdHandler,
    UpdateTokenHandler,
    UpgradeTokenHandler,
    WelcomeTokenHandler,
    CreateUpgradeTokenOrderHandler,
];
