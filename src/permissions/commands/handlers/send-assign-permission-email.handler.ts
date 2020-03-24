import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { PermissionRepository } from "../../repository/permission.repository";
import { Logger } from "@nestjs/common";
import { SendAssignPermissionEmailCommand } from "../impl/send-assign-permission-email.command";

@CommandHandler(SendAssignPermissionEmailCommand)
export class SendAssignPermissionEmailHandler implements ICommandHandler<SendAssignPermissionEmailCommand> {
  constructor(
    private readonly repository: PermissionRepository,
    private readonly publisher: EventPublisher
  ) { }

  async execute(command: SendAssignPermissionEmailCommand) {
    Logger.log("Async SendAssignPermissionEmailHandler...", "SendAssignPermissionEmailCommand");

    const { streamId, permissionAssignDto } = command;
    const permission = this.publisher.mergeObjectContext(
      await this.repository.sendAssignPermissionEmail(streamId, permissionAssignDto)
    );
    permission.commit();
  }
}
