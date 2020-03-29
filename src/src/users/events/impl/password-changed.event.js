"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PasswordChangedEvent {
    constructor(streamId, userId, newPassword, oldPassword) {
        this.streamId = streamId;
        this.userId = userId;
        this.newPassword = newPassword;
        this.oldPassword = oldPassword;
    }
}
exports.PasswordChangedEvent = PasswordChangedEvent;
class PasswordChangedSuccessEvent {
    constructor(streamId, userId, newPassword, oldPassword) {
        this.streamId = streamId;
        this.userId = userId;
        this.newPassword = newPassword;
        this.oldPassword = oldPassword;
    }
}
exports.PasswordChangedSuccessEvent = PasswordChangedSuccessEvent;
class PasswordChangedFailedEvent {
    constructor(streamId, userId, newPassword, oldPassword, error) {
        this.streamId = streamId;
        this.userId = userId;
        this.newPassword = newPassword;
        this.oldPassword = oldPassword;
        this.error = error;
    }
}
exports.PasswordChangedFailedEvent = PasswordChangedFailedEvent;
//# sourceMappingURL=password-changed.event.js.map