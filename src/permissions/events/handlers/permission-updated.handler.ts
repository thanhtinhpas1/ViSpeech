import { Logger } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { PermissionDto } from "permissions/dtos/permissions.dto";
import { Repository } from "typeorm";
import { PermissionUpdatedEvent } from "../impl/permission-updated.event";

@EventsHandler(PermissionUpdatedEvent)
export class PermissionUpdatedHandler implements IEventHandler<PermissionUpdatedEvent> {
  constructor(
    @InjectRepository(PermissionDto)
    private readonly repository: Repository<PermissionDto>,
  ) { }

  async handle(event: PermissionUpdatedEvent) {
    Logger.log(event.permissionDto._id, "PermissionUpdatedEvent"); // write here
    const { streamId, permissionDto } = event;
    const { _id, ...permissionInfo } = permissionDto;

    try {
      return await this.repository.update({ _id }, permissionInfo);
    } catch (error) {
      Logger.error(error, "", "PermissionUpdatedEvent");
    }
  }
}
