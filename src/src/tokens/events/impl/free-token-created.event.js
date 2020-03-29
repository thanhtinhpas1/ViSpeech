"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FreeTokenCreatedEvent {
    constructor(streamId, tokenDto) {
        this.streamId = streamId;
        this.tokenDto = tokenDto;
    }
}
exports.FreeTokenCreatedEvent = FreeTokenCreatedEvent;
class FreeTokenCreatedSuccessEvent {
    constructor(streamId, tokenDto) {
        this.streamId = streamId;
        this.tokenDto = tokenDto;
    }
}
exports.FreeTokenCreatedSuccessEvent = FreeTokenCreatedSuccessEvent;
class FreeTokenCreatedFailedEvent {
    constructor(streamId, tokenDto, error) {
        this.streamId = streamId;
        this.tokenDto = tokenDto;
        this.error = error;
    }
}
exports.FreeTokenCreatedFailedEvent = FreeTokenCreatedFailedEvent;
//# sourceMappingURL=free-token-created.event.js.map