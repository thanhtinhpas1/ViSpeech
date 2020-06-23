import { ICommand } from '@nestjs/cqrs';

export class WelcomeOrderCommand implements ICommand {
    constructor(
        public readonly streamId: string,
        public readonly orderId: string) {
    }
}
