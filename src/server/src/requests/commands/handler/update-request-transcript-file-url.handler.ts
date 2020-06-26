import { CommandHandler, EventBus, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Logger, NotFoundException } from '@nestjs/common';
import { getMongoRepository } from 'typeorm';
import { RequestRepository } from 'requests/repository/request.repository';
import { RequestDto } from 'requests/dtos/requests.dto';
import { UpdateRequestTranscriptFileUrlCommand } from '../impl/update-request-transcript-file-url.command';
import { RequestTranscriptFileUrlUpdatedFailedEvent } from 'requests/events/impl/request-transcript-file-url-updated.event';

@CommandHandler(UpdateRequestTranscriptFileUrlCommand)
export class UpdateRequestTranscriptFileUrlHandler implements ICommandHandler<UpdateRequestTranscriptFileUrlCommand> {
    constructor(
        private readonly repository: RequestRepository,
        private readonly publisher: EventPublisher,
        private readonly eventBus: EventBus
    ) {
    }

    async execute(command: UpdateRequestTranscriptFileUrlCommand) {
        Logger.log('Async UpdateRequestHandler...', 'UpdateRequestTranscriptFileUrlCommand');
        const {streamId, requestId, url} = command;

        try {
            const request = await getMongoRepository(RequestDto).findOne({_id: requestId});
            if (!request) {
                throw new NotFoundException(`Request with _id ${requestId} does not exist.`);
            }

            // use mergeObjectContext for dto dispatch events
            const requestModel = this.publisher.mergeObjectContext(
                await this.repository.updateRequestTranscriptFileUrl(streamId, requestId, url)
            );
            requestModel.commit();
        } catch (error) {
            this.eventBus.publish(new RequestTranscriptFileUrlUpdatedFailedEvent(streamId, requestId, url, error));
        }
    }
}
