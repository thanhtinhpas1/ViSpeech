"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PermissionAssignEmailSentEvent {
    constructor(streamId, permissionAssignDto) {
        this.streamId = streamId;
        this.permissionAssignDto = permissionAssignDto;
    }
}
exports.PermissionAssignEmailSentEvent = PermissionAssignEmailSentEvent;
class PermissionAssignEmailSentSuccessEvent {
    constructor(streamId, permissionAssignDto) {
        this.streamId = streamId;
        this.permissionAssignDto = permissionAssignDto;
    }
}
exports.PermissionAssignEmailSentSuccessEvent = PermissionAssignEmailSentSuccessEvent;
class PermissionAssignEmailSentFailedEvent {
    constructor(streamId, permissionAssignDto, error) {
        this.streamId = streamId;
        this.permissionAssignDto = permissionAssignDto;
        this.error = error;
    }
}
exports.PermissionAssignEmailSentFailedEvent = PermissionAssignEmailSentFailedEvent;
//# sourceMappingURL=permission-assign-email-sent.event.js.map