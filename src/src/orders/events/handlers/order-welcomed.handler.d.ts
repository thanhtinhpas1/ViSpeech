import { IEventHandler } from '@nestjs/cqrs';
import { OrderWelcomedEvent } from '../impl/order-welcomed.event';
export declare class OrderWelcomedHandler implements IEventHandler<OrderWelcomedEvent> {
    handle(event: OrderWelcomedEvent): void;
}
