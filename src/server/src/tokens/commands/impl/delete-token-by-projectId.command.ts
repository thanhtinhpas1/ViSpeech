import {ICommand} from '@nestjs/cqrs';

export class DeleteTokenByProjectIdCommand implements ICommand {
    constructor(
        public readonly streamId: string,
        public readonly projectId: string
    ) {
    }
}
