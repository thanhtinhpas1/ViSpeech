import {CommandHandler, EventPublisher, ICommandHandler} from "@nestjs/cqrs";
import {UserRepository} from "../../repository/user.repository";
import {Logger} from "@nestjs/common";
import {AssignRoleUserCommand} from "../impl/assign-role-user.command";

@CommandHandler(AssignRoleUserCommand)
export class AssignUserRoleHandler implements ICommandHandler<AssignRoleUserCommand> {
    constructor(
        private readonly repository: UserRepository,
        private readonly publisher: EventPublisher
    ) {
    }

    async execute(command: AssignRoleUserCommand): Promise<any> {
        Logger.log("Async AssignUserRoleHandler...", "AssignUserRoleCommand");
        const {userId, roleName, assignerId} = command;
        const user = this.publisher.mergeObjectContext(
            await this.repository.assignUserRole(userId, roleName, assignerId)
        );
        user.commit();
    }
}
