import { Logger } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RequestRepository } from 'requests/repository/request.repository';
import { CreateRequestCommand } from '../impl/create-request.command';

@CommandHandler(CreateRequestCommand)
export class CreateRequestHandler implements ICommandHandler<CreateRequestCommand> {
    constructor(
        private readonly repository: RequestRepository,
        private readonly publisher: EventPublisher,
    ) {
    }

    async execute(command: CreateRequestCommand) {
        Logger.log('Async CreateRequestHandler...', 'CreateRequestCommand');
        const { streamId, tokenDto, requestDto } = command;
        const request = this.publisher.mergeObjectContext(
            await this.repository.createRequest(streamId, requestDto, tokenDto)
        );
        request.commit();
    }
}