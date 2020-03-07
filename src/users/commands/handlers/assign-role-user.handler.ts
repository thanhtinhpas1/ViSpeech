import {CommandHandler, EventPublisher, ICommandHandler} from '@nestjs/cqrs';
import {AssignRoleUserCommand} from '../impl/assign-role-user.command';
import {UserRepository} from '../../repository/user.repository';
import {Logger} from '@nestjs/common';

@CommandHandler(AssignRoleUserCommand)
export class AssignRoleUserHandler implements ICommandHandler {
    constructor(
        private readonly repository: UserRepository,
        private readonly publisher: EventPublisher,
    ) {
    }

    async execute(command: any): Promise<any> {
        Logger.log('Async AssignRoleHandler...', 'AssignRoleCommand');
        const {userId, roleName} = command;
        const user = this.publisher.mergeObjectContext(
            await this.repository.assignRoleUser(userId, roleName),
        );
        user.commit();
    }
}