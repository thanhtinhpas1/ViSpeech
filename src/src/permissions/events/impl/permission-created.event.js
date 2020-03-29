"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PermissionCreatedEvent {
    constructor(streamId, permissionDto) {
        this.streamId = streamId;
        this.permissionDto = permissionDto;
    }
}
exports.PermissionCreatedEvent = PermissionCreatedEvent;
class PermissionCreatedSuccessEvent {
    constructor(streamId, permissionDto) {
        this.streamId = streamId;
        this.permissionDto = permissionDto;
    }
}
exports.PermissionCreatedSuccessEvent = PermissionCreatedSuccessEvent;
class PermissionCreatedFailedEvent {
    constructor(streamId, permissionDto, error) {
        this.streamId = streamId;
        this.permissionDto = permissionDto;
        this.error = error;
    }
}
exports.PermissionCreatedFailedEvent = PermissionCreatedFailedEvent;
//# sourceMappingURL=permission-created.event.js.map