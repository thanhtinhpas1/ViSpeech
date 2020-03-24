import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { DeletePermissionCommand } from "../impl/delete-permission.command";
import { PermissionRepository } from "../../repository/permission.repository";
import { Logger } from "@nestjs/common";

@CommandHandler(DeletePermissionCommand)
export class DeletePermissionHandler implements ICommandHandler<DeletePermissionCommand> {
  constructor(
    private readonly repository: PermissionRepository,
    private readonly publisher: EventPublisher
  ) { }

  async execute(command: DeletePermissionCommand) {
    Logger.log("Async DeletePermissionHandler...", "DeletePermissionCommand");
    const { streamId, permissionIdDto } = command;
    const permission = this.publisher.mergeObjectContext(
      await this.repository.deletePermission(streamId, permissionIdDto._id)
    );
    permission.commit();
  }
}
