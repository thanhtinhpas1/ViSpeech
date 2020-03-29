"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OrderUpdatedEvent {
    constructor(streamId, orderDto) {
        this.streamId = streamId;
        this.orderDto = orderDto;
    }
}
exports.OrderUpdatedEvent = OrderUpdatedEvent;
//# sourceMappingURL=order-updated.event.js.map