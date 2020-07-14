import { Inject, Logger } from "@nestjs/common";
import { EventBus, EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Utils } from "utils";
import { CONSTANTS } from "common/constant";
import { config } from "../../../../config";
import { ClientKafka } from "@nestjs/microservices";
import { RequestDto } from "requests/dtos/requests.dto";
import {
    RequestTranscriptFileUrlUpdatedEvent,
    RequestTranscriptFileUrlUpdatedFailedEvent,
    RequestTranscriptFileUrlUpdatedSuccessEvent
} from "../impl/request-transcript-file-url-updated.event";


@EventsHandler(RequestTranscriptFileUrlUpdatedEvent)
export class RequestTranscriptFileUrlUpdatedHandler implements IEventHandler<RequestTranscriptFileUrlUpdatedEvent> {
    constructor(
        @InjectRepository(RequestDto)
        private readonly repository: Repository<RequestDto>,
        private readonly eventBus: EventBus
    ) {
    }

    async handle(event: RequestTranscriptFileUrlUpdatedEvent) {
        Logger.log(event.requestId, 'RequestTranscriptFileUrlUpdatedEvent'); // write here
        const {streamId, requestId, url} = event;

        try {
            await this.repository.update({_id: requestId}, {transcriptFileUrl: url, status: CONSTANTS.STATUS.SUCCESS, updatedDate: new Date()});
            this.eventBus.publish(new RequestTranscriptFileUrlUpdatedSuccessEvent(streamId, requestId, url));
        } catch (error) {
            this.eventBus.publish(new RequestTranscriptFileUrlUpdatedFailedEvent(streamId, requestId, url, error));
        }
    }
}

@EventsHandler(RequestTranscriptFileUrlUpdatedSuccessEvent)
export class RequestTranscriptFileUrlUpdatedSuccessHandler
    implements IEventHandler<RequestTranscriptFileUrlUpdatedSuccessEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
        this.clientKafka.connect();
    }

    handle(event: RequestTranscriptFileUrlUpdatedSuccessEvent) {
        this.clientKafka.emit(CONSTANTS.TOPICS.REQUEST_UPDATED_SUCCESS_EVENT, JSON.stringify(event));
        Logger.log(event.requestId, 'RequestTranscriptFileUrlUpdatedSuccessEvent');
    }
}

@EventsHandler(RequestTranscriptFileUrlUpdatedFailedEvent)
export class RequestTranscriptFileUrlUpdatedFailedHandler
    implements IEventHandler<RequestTranscriptFileUrlUpdatedFailedEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
        this.clientKafka.connect();
    }

    handle(event: RequestTranscriptFileUrlUpdatedFailedEvent) {
        const errorObj = Utils.getErrorObj(event.error)
        event['errorObj'] = errorObj
        this.clientKafka.emit(CONSTANTS.TOPICS.REQUEST_UPDATED_FAILED_EVENT, JSON.stringify(event));
        Logger.log(errorObj, 'RequestTranscriptFileUrlUpdatedFailedEvent');
    }
}