"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ChangePasswordCommand {
    constructor(streamId, userId, newPassword, oldPassword) {
        this.streamId = streamId;
        this.userId = userId;
        this.newPassword = newPassword;
        this.oldPassword = oldPassword;
    }
}
exports.ChangePasswordCommand = ChangePasswordCommand;
//# sourceMappingURL=change-password.command.js.map