import { IEvent } from "@nestjs/cqrs";

export class PermissionWelcomedEvent implements IEvent {
  constructor(
    public readonly streamId: string,
    public readonly permissionId: string) { }
}