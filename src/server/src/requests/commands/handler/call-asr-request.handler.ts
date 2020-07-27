import { Logger } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RequestRepository } from 'requests/repository/request.repository';
import { CallAsrRequestCommand } from '../impl/call-asr-request.command';

@CommandHandler(CallAsrRequestCommand)
export class CallAsrRequestHandler implements ICommandHandler<CallAsrRequestCommand> {
    constructor(
        private readonly repository: RequestRepository,
        private readonly publisher: EventPublisher,
    ) {
    }

    async execute(command: CallAsrRequestCommand) {
        Logger.log('Async CallAsrRequestHandler...', 'CallAsrRequestCommand');
        const { streamId, tokenDto, requestDto } = command;
        const request = this.publisher.mergeObjectContext(
            await this.repository.callAsr(streamId, requestDto, tokenDto)
        );
        request.commit();
    }
}