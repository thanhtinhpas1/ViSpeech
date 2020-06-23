import { ICommand } from '@nestjs/cqrs';

export class WelcomeProjectCommand implements ICommand {
    constructor(
        public readonly streamId: string,
        public readonly projectId: string) {
    }
}
