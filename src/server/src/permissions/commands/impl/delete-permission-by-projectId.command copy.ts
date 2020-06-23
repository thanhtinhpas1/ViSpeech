import { ICommand } from '@nestjs/cqrs';

export class DeletePermissionByProjectIdCommand implements ICommand {
    constructor(
        public readonly streamId: string,
        public readonly projectId: string
    ) {
    }
}
