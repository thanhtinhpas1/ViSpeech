import {ICommand} from '@nestjs/cqrs';

export class WelcomeReportCommand implements ICommand {
    constructor(
        public readonly streamId: string,
        public readonly reportId: string) {
    }
}
