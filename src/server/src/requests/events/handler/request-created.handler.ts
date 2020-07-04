import { Inject, Logger } from '@nestjs/common';
import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { RequestDto } from 'requests/dtos/requests.dto';
import { Repository } from 'typeorm';
import { RequestCreatedEvent, RequestCreatedFailedEvent, RequestCreatedSuccessEvent } from '../impl/request-created.event';
import { CONSTANTS } from 'common/constant';
import { ClientKafka } from '@nestjs/microservices';
import { config } from '../../../../config';
import { Utils } from 'utils';

@EventsHandler(RequestCreatedEvent)
export class RequestCreatedHandler implements IEventHandler<RequestCreatedEvent> {
    constructor(
        @InjectRepository(RequestDto)
        private readonly requestRepository: Repository<RequestDto>,
        private readonly eventBus: EventBus
    ) {
    }

    async handle(event: RequestCreatedEvent) {
        Logger.log(event.tokenDto._id, 'RequestCreatedEvent');
        const {streamId, requestDto, tokenDto} = event;
        try {
            requestDto.duration = Number(requestDto.duration);
            requestDto.status = CONSTANTS.STATUS.PENDING;
            await this.requestRepository.save(requestDto);
            this.eventBus.publish(new RequestCreatedSuccessEvent(streamId, requestDto, tokenDto));
        } catch (error) {
            this.eventBus.publish(new RequestCreatedFailedEvent(streamId, requestDto, tokenDto, error));
        }
    }
}

@EventsHandler(RequestCreatedSuccessEvent)
export class RequestCreatedSuccessHandler
    implements IEventHandler<RequestCreatedSuccessEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
        this.clientKafka.connect();
    }

    handle(event: RequestCreatedSuccessEvent) {
        this.clientKafka.emit(CONSTANTS.TOPICS.REQUEST_CREATED_SUCCESS_EVENT, JSON.stringify(event));
        Logger.log(event.streamId, 'RequestCreatedSuccessEvent');
    }
}

@EventsHandler(RequestCreatedFailedEvent)
export class RequestCreatedFailedHandler
    implements IEventHandler<RequestCreatedFailedEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
        this.clientKafka.connect();
    }

    handle(event: RequestCreatedFailedEvent) {
        const errorObj = Utils.getErrorObj(event.error)
        event['errorObj'] = errorObj
        this.clientKafka.emit(CONSTANTS.TOPICS.REQUEST_CREATED_FAILED_EVENT, JSON.stringify(event));
        Logger.log(errorObj, 'RequestCreatedFailedEvent');
    }
}
