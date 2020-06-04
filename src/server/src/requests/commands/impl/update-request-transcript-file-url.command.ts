import {ICommand} from '@nestjs/cqrs';

export class UpdateRequestTranscriptFileUrlCommand implements ICommand {
    constructor(
        public readonly streamId: string,
        public readonly requestId: string,
        public readonly url: string) {
    }
}
