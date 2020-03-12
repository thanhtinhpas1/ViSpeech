import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { AssignUserRoleCommand } from "../impl/assign-user-role.command";
import { UserRepository } from "../../repository/user.repository";
import { Logger } from "@nestjs/common";

@CommandHandler(AssignUserRoleCommand)
export class AssignUserRoleHandler implements ICommandHandler {
  constructor(
    private readonly repository: UserRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: any): Promise<any> {
    Logger.log("Async AssignUserRoleHandler...", "AssignUserRoleCommand");
    const { transactionId, userId, roleNames, assignerId } = command;
    const user = this.publisher.mergeObjectContext(
      await this.repository.assignUserRole(transactionId, userId, roleNames, assignerId)
    );
    user.commit();
  }
}
