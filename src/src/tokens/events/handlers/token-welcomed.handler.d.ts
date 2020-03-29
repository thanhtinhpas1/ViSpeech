import { IEventHandler } from '@nestjs/cqrs';
import { TokenWelcomedEvent } from '../impl/token-welcomed.event';
export declare class TokenWelcomedHandler implements IEventHandler<TokenWelcomedEvent> {
    handle(event: TokenWelcomedEvent): void;
}
