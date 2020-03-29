"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OrderedTokenCreatedEvent {
    constructor(streamId, tokenDto) {
        this.streamId = streamId;
        this.tokenDto = tokenDto;
    }
}
exports.OrderedTokenCreatedEvent = OrderedTokenCreatedEvent;
class OrderedTokenCreatedSuccessEvent {
    constructor(streamId, tokenDto) {
        this.streamId = streamId;
        this.tokenDto = tokenDto;
    }
}
exports.OrderedTokenCreatedSuccessEvent = OrderedTokenCreatedSuccessEvent;
class OrderedTokenCreatedFailedEvent {
    constructor(streamId, tokenDto, error) {
        this.streamId = streamId;
        this.tokenDto = tokenDto;
        this.error = error;
    }
}
exports.OrderedTokenCreatedFailedEvent = OrderedTokenCreatedFailedEvent;
//# sourceMappingURL=ordered-token-created.event.js.map