import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenDto } from 'tokens/dtos/tokens.dto';
import { Repository } from 'typeorm';
import { TokenTypeDto } from 'tokens/dtos/token-types.dto';
import { FreeTokenCreatedEvent, FreeTokenCreatedFailedEvent, FreeTokenCreatedSuccessEvent } from '../impl/free-token-created.event';
import { CONSTANTS } from 'common/constant';
import { Utils } from 'utils';
import { config } from '../../../../config';
import { ClientKafka } from '@nestjs/microservices';

@EventsHandler(FreeTokenCreatedEvent)
export class FreeTokenCreatedHandler implements IEventHandler<FreeTokenCreatedEvent> {
    constructor(
        @InjectRepository(TokenDto)
        private readonly repository: Repository<TokenDto>,
        @InjectRepository(TokenTypeDto)
        private readonly repositoryTokenType: Repository<TokenTypeDto>,
        private readonly eventBus: EventBus
    ) {
    }

    async handle(event: FreeTokenCreatedEvent) {
        Logger.log(event.tokenDto._id, 'FreeTokenCreatedEvent');
        const { streamId, tokenDto } = event;
        let token = JSON.parse(JSON.stringify(tokenDto)); // deep clone

        try {
            const tokenTypeDto = await this.repositoryTokenType.findOne({ name: CONSTANTS.TOKEN_TYPE.FREE });
            token.tokenTypeId = tokenTypeDto._id;
            token.minutes = tokenTypeDto.minutes;
            token = Utils.removePropertiesFromObject(token, ['tokenType', 'orderId']);
            await this.repository.save(token);
            this.eventBus.publish(new FreeTokenCreatedSuccessEvent(streamId, tokenDto));
        } catch (error) {
            this.eventBus.publish(new FreeTokenCreatedFailedEvent(streamId, tokenDto, error));
        }
    }
}

@EventsHandler(FreeTokenCreatedSuccessEvent)
export class FreeTokenCreatedSuccessHandler
    implements IEventHandler<FreeTokenCreatedSuccessEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
        this.clientKafka.connect();
    }

    handle(event: FreeTokenCreatedSuccessEvent) {
        this.clientKafka.emit(CONSTANTS.TOPICS.FREE_TOKEN_CREATED_SUCCESS_EVENT, event);
        Logger.log(event.tokenDto._id, 'FreeTokenCreatedSuccessEvent');
    }
}

@EventsHandler(FreeTokenCreatedFailedEvent)
export class FreeTokenCreatedFailedHandler
    implements IEventHandler<FreeTokenCreatedFailedEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
        this.clientKafka.connect();
    }
    handle(event: FreeTokenCreatedFailedEvent) {
        this.clientKafka.emit(CONSTANTS.TOPICS.FREE_TOKEN_CREATED_FAILED_EVENT, event);
        Logger.log(event.error ? event.error['errmsg'] : event.error, 'FreeTokenCreatedFailedEvent');
    }
}
