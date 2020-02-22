import {AggregateRoot} from '@nestjs/cqrs';
import {OrderCreatedEvent} from '../events/impl/order-created.event';
import {OrderUpdatedEvent} from '../events/impl/order-updated.event';
import {OrderDeletedEvent} from '../events/impl/order-deleted.event';
import {OrderWelcomedEvent} from '../events/impl/order-welcomed.event';

export class Order extends AggregateRoot {
    [x: string]: any;

    constructor(private readonly id: string | undefined) {
        super();
    }

    setData(data) {
        this.data = data;
    }

    createOrder() {
        this.apply(new OrderCreatedEvent(this.data));
    }

    updateOrder() {
        this.apply(new OrderUpdatedEvent(this.data));
    }

    welcomeOrder() {
        this.apply(new OrderWelcomedEvent(this.id));
    }

    deleteOrder() {
        this.apply(new OrderDeletedEvent(this.id));
    }
}
