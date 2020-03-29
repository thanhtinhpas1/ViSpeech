"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserUpdatedEvent {
    constructor(streamId, userDto) {
        this.streamId = streamId;
        this.userDto = userDto;
    }
}
exports.UserUpdatedEvent = UserUpdatedEvent;
class UserUpdatedSuccessEvent {
    constructor(streamId, userDto) {
        this.streamId = streamId;
        this.userDto = userDto;
    }
}
exports.UserUpdatedSuccessEvent = UserUpdatedSuccessEvent;
class UserUpdatedFailedEvent {
    constructor(streamId, userDto, error) {
        this.streamId = streamId;
        this.userDto = userDto;
        this.error = error;
    }
}
exports.UserUpdatedFailedEvent = UserUpdatedFailedEvent;
//# sourceMappingURL=user-updated.event.js.map