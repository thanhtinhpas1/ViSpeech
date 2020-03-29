"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CreatePermissionCommand {
    constructor(streamId, permissionDto) {
        this.streamId = streamId;
        this.permissionDto = permissionDto;
    }
}
exports.CreatePermissionCommand = CreatePermissionCommand;
class CreateFreePermissionCommand {
    constructor(streamId, permissionDto) {
        this.streamId = streamId;
        this.permissionDto = permissionDto;
    }
}
exports.CreateFreePermissionCommand = CreateFreePermissionCommand;
class CreateOrderedPermissionCommand {
    constructor(streamId, permissionDto) {
        this.streamId = streamId;
        this.permissionDto = permissionDto;
    }
}
exports.CreateOrderedPermissionCommand = CreateOrderedPermissionCommand;
//# sourceMappingURL=create-permission.command.js.map