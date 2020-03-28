import {ICommand} from '@nestjs/cqrs';

export class VerifyEmailCommand implements ICommand {
    constructor(
        public readonly streamId: string,
        public readonly emailToken: string) {
    }
}
