"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CreateOrderStartCommand {
    constructor(streamId, orderDto) {
        this.streamId = streamId;
        this.orderDto = orderDto;
    }
}
exports.CreateOrderStartCommand = CreateOrderStartCommand;
class CreateOrderCommand {
    constructor(streamId, orderDto) {
        this.streamId = streamId;
        this.orderDto = orderDto;
    }
}
exports.CreateOrderCommand = CreateOrderCommand;
//# sourceMappingURL=create-order.command.js.map