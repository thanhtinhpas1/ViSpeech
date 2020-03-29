import { IEventHandler } from '@nestjs/cqrs';
import { PermissionWelcomedEvent } from '../impl/permission-welcomed.event';
export declare class PermissionWelcomedHandler implements IEventHandler<PermissionWelcomedEvent> {
    handle(event: PermissionWelcomedEvent): void;
}
