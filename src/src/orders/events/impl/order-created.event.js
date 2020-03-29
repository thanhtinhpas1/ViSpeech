"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OrderCreationStartedEvent {
    constructor(streamId, orderDto) {
        this.streamId = streamId;
        this.orderDto = orderDto;
    }
}
exports.OrderCreationStartedEvent = OrderCreationStartedEvent;
class OrderCreatedEvent {
    constructor(streamId, orderDto) {
        this.streamId = streamId;
        this.orderDto = orderDto;
    }
}
exports.OrderCreatedEvent = OrderCreatedEvent;
class OrderCreatedSuccessEvent {
    constructor(streamId, orderDto) {
        this.streamId = streamId;
        this.orderDto = orderDto;
    }
}
exports.OrderCreatedSuccessEvent = OrderCreatedSuccessEvent;
class OrderCreatedFailedEvent {
    constructor(streamId, orderDto, error) {
        this.streamId = streamId;
        this.orderDto = orderDto;
        this.error = error;
    }
}
exports.OrderCreatedFailedEvent = OrderCreatedFailedEvent;
//# sourceMappingURL=order-created.event.js.map