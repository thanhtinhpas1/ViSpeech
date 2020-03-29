"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserDeletedEvent {
    constructor(streamId, userId) {
        this.streamId = streamId;
        this.userId = userId;
    }
}
exports.UserDeletedEvent = UserDeletedEvent;
class UserDeletedSuccessEvent {
    constructor(streamId, userId) {
        this.streamId = streamId;
        this.userId = userId;
    }
}
exports.UserDeletedSuccessEvent = UserDeletedSuccessEvent;
class UserDeletedFailedEvent {
    constructor(streamId, userId, error) {
        this.streamId = streamId;
        this.userId = userId;
        this.error = error;
    }
}
exports.UserDeletedFailedEvent = UserDeletedFailedEvent;
//# sourceMappingURL=user-deleted.event.js.map