"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TokenDeletedEvent {
    constructor(streamId, tokenId) {
        this.streamId = streamId;
        this.tokenId = tokenId;
    }
}
exports.TokenDeletedEvent = TokenDeletedEvent;
class TokenDeletedByUserIdEvent {
    constructor(streamId, userId) {
        this.streamId = streamId;
        this.userId = userId;
    }
}
exports.TokenDeletedByUserIdEvent = TokenDeletedByUserIdEvent;
//# sourceMappingURL=token-deleted.event.js.map