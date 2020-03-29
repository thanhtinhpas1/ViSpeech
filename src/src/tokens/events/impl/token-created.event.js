"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TokenCreatedEvent {
    constructor(streamId, tokenDto) {
        this.streamId = streamId;
        this.tokenDto = tokenDto;
    }
}
exports.TokenCreatedEvent = TokenCreatedEvent;
class TokenCreatedSuccessEvent {
    constructor(streamId, tokenDto) {
        this.streamId = streamId;
        this.tokenDto = tokenDto;
    }
}
exports.TokenCreatedSuccessEvent = TokenCreatedSuccessEvent;
class TokenCreatedFailedEvent {
    constructor(streamId, tokenDto, error) {
        this.streamId = streamId;
        this.tokenDto = tokenDto;
        this.error = error;
    }
}
exports.TokenCreatedFailedEvent = TokenCreatedFailedEvent;
//# sourceMappingURL=token-created.event.js.map