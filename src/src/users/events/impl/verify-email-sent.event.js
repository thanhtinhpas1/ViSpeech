"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VerifyEmailSentEvent {
    constructor(streamId, userId) {
        this.streamId = streamId;
        this.userId = userId;
    }
}
exports.VerifyEmailSentEvent = VerifyEmailSentEvent;
class VerifyEmailSentSuccessEvent {
    constructor(streamId, userId) {
        this.streamId = streamId;
        this.userId = userId;
    }
}
exports.VerifyEmailSentSuccessEvent = VerifyEmailSentSuccessEvent;
class VerifyEmailSentFailedEvent {
    constructor(streamId, userId, error) {
        this.streamId = streamId;
        this.userId = userId;
        this.error = error;
    }
}
exports.VerifyEmailSentFailedEvent = VerifyEmailSentFailedEvent;
//# sourceMappingURL=verify-email-sent.event.js.map