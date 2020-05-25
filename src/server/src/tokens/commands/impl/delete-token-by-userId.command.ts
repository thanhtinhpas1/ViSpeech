import {ICommand} from '@nestjs/cqrs';

export class DeleteTokenByUserIdCommand implements ICommand {
    constructor(
        public readonly streamId: string,
        public readonly userId: string
    ) {
    }
}
