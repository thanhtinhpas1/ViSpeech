import { IEventHandler } from '@nestjs/cqrs';
import { UserWelcomedEvent } from '../impl/user-welcomed.event';
export declare class UserWelcomedHandler implements IEventHandler<UserWelcomedEvent> {
    handle(event: UserWelcomedEvent): Promise<void>;
}
