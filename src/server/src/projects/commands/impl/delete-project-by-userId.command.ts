import { ICommand } from '@nestjs/cqrs';

export class DeleteProjectByUserIdCommand implements ICommand {
    constructor(
        public readonly streamId: string,
        public readonly userId: string
    ) {
    }
}
