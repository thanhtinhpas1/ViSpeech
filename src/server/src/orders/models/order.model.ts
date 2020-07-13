import { AggregateRoot } from '@nestjs/cqrs';
import { OrderCreatedEvent } from '../events/impl/order-created.event';
import { OrderUpdatedEvent } from '../events/impl/order-updated.event';
import { OrderDeletedEvent } from '../events/impl/order-deleted.event';
import { OrderWelcomedEvent } from '../events/impl/order-welcomed.event';
import { OrderToUpgradeCreatedEvent } from '../events/impl/order-to-upgrade-created.event';

export class Order extends AggregateRoot {
    [x: string]: any;

    constructor(private readonly id: string | undefined) {
        super();
    }

    setData(data) {
        this.data = data;
    }

    createOrder(streamId: string) {
        this.apply(new OrderCreatedEvent(streamId, this.data));
    }

    createOrderToUpgrade(streamId: string) {
        this.apply(new OrderToUpgradeCreatedEvent(streamId, this.data));
    }

    updateOrder(streamId: string) {
        this.apply(new OrderUpdatedEvent(streamId, this.data));
    }

    welcomeOrder(streamId: string) {
        this.apply(new OrderWelcomedEvent(streamId, this.id));
    }

    deleteOrder(streamId: string) {
        this.apply(new OrderDeletedEvent(streamId, this.id));
    }
}
