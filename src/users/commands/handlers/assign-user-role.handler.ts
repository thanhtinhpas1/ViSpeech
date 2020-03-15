import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { UserRepository } from "../../repository/user.repository";
import { Logger } from "@nestjs/common";
import { AssignUserRoleCommand } from "../impl/assign-user-role.command";

@CommandHandler(AssignUserRoleCommand)
export class AssignUserRoleHandler implements ICommandHandler<AssignUserRoleCommand> {
    constructor(
        private readonly repository: UserRepository,
        private readonly publisher: EventPublisher
    ) {
    }

    async execute(command: AssignUserRoleCommand): Promise<any> {
        Logger.log("Async AssignUserRoleHandler...", "AssignUserRoleCommand");
        const { userId, roleName, assignerId } = command;
        const user = this.publisher.mergeObjectContext(
            await this.repository.assignUserRole(userId, roleName, assignerId)
        );
        user.commit();
    }
}
