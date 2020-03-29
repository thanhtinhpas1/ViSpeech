"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cqrs_1 = require("@nestjs/cqrs");
const order_created_event_1 = require("../events/impl/order-created.event");
const order_updated_event_1 = require("../events/impl/order-updated.event");
const order_deleted_event_1 = require("../events/impl/order-deleted.event");
const order_welcomed_event_1 = require("../events/impl/order-welcomed.event");
class Order extends cqrs_1.AggregateRoot {
    constructor(id) {
        super();
        this.id = id;
    }
    setData(data) {
        this.data = data;
    }
    createOrderStart(streamId) {
        this.apply(new order_created_event_1.OrderCreationStartedEvent(streamId, this.data));
    }
    createOrder(streamId) {
        this.apply(new order_created_event_1.OrderCreatedEvent(streamId, this.data));
    }
    updateOrder(streamId) {
        this.apply(new order_updated_event_1.OrderUpdatedEvent(streamId, this.data));
    }
    welcomeOrder(streamId) {
        this.apply(new order_welcomed_event_1.OrderWelcomedEvent(streamId, this.id));
    }
    deleteOrder(streamId) {
        this.apply(new order_deleted_event_1.OrderDeletedEvent(streamId, this.id));
    }
}
exports.Order = Order;
//# sourceMappingURL=order.model.js.map