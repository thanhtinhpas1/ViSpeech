import { IEvent } from "@nestjs/cqrs";
import { PermissionResponseDto } from "permissions/dtos/permissions.dto";

export class PermissionAssignRepliedEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly permissionResponseDto: PermissionResponseDto
    ) { }
}