import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { UpdatePermissionCommand } from "../impl/update-permission.command";
import { PermissionRepository } from "../../repository/permission.repository";
import { Logger } from "@nestjs/common";

@CommandHandler(UpdatePermissionCommand)
export class UpdatePermissionHandler implements ICommandHandler<UpdatePermissionCommand> {
  constructor(
    private readonly repository: PermissionRepository,
    private readonly publisher: EventPublisher
  ) { }

  async execute(command: UpdatePermissionCommand) {
    Logger.log("Async UpdatePermissionHandler...", "UpdatePermissionCommand");

    const { streamId, permissionDto } = command;
    const permission = this.publisher.mergeObjectContext(
      await this.repository.updatePermission(streamId, permissionDto)
    );
    permission.commit();
  }
}
