import {ICommand} from '@nestjs/cqrs';

export class DeletePermissionByUserIdCommand implements ICommand {
    constructor(
        public readonly streamId: string,
        public readonly userId: string
    ) {
    }
}
