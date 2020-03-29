"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserCreationStartedEvent {
    constructor(streamId, userDto) {
        this.streamId = streamId;
        this.userDto = userDto;
    }
}
exports.UserCreationStartedEvent = UserCreationStartedEvent;
class UserCreatedEvent {
    constructor(streamId, userDto) {
        this.streamId = streamId;
        this.userDto = userDto;
    }
}
exports.UserCreatedEvent = UserCreatedEvent;
class UserCreatedSuccessEvent {
    constructor(streamId, userDto) {
        this.streamId = streamId;
        this.userDto = userDto;
    }
}
exports.UserCreatedSuccessEvent = UserCreatedSuccessEvent;
class UserCreatedFailedEvent {
    constructor(streamId, userDto, error) {
        this.streamId = streamId;
        this.userDto = userDto;
        this.error = error;
    }
}
exports.UserCreatedFailedEvent = UserCreatedFailedEvent;
//# sourceMappingURL=user-created.event.js.map