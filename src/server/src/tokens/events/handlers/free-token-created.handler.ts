import { Inject, Logger } from '@nestjs/common';
import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { CONSTANTS } from 'common/constant';
import { TokenTypeDto } from 'tokens/dtos/token-types.dto';
import { TokenDto } from 'tokens/dtos/tokens.dto';
import { Repository } from 'typeorm';
import { Utils } from 'utils';
import { config } from '../../../../config';
import { AuthService } from '../../../auth/auth.service';
import { FreeTokenCreatedEvent, FreeTokenCreatedFailedEvent, FreeTokenCreatedSuccessEvent } from '../impl/free-token-created.event';

@EventsHandler(FreeTokenCreatedEvent)
export class FreeTokenCreatedHandler implements IEventHandler<FreeTokenCreatedEvent> {
    constructor(
        @InjectRepository(TokenDto)
        private readonly repository: Repository<TokenDto>,
        @InjectRepository(TokenTypeDto)
        private readonly repositoryTokenType: Repository<TokenTypeDto>,
        private readonly eventBus: EventBus,
        private readonly authService: AuthService,
    ) {
    }

    async handle(event: FreeTokenCreatedEvent) {
        Logger.log(event.tokenDto._id, 'FreeTokenCreatedEvent');
        const { streamId, tokenDto } = event;
        let token = { ...tokenDto }; // deep clone

        try {
            const tokenTypeDto = await this.repositoryTokenType.findOne({ name: CONSTANTS.TOKEN_TYPE.FREE });
            token.tokenTypeId = tokenTypeDto._id;
            token.tokenType = tokenTypeDto.name;
            token.minutes = Number(tokenTypeDto.minutes);
            token.usedMinutes = 0;
            token.isValid = Utils.convertToBoolean(token.isValid);
            token.name = 'API key miễn phí';
            token = Utils.removePropertiesFromObject(token, [ 'orderId' ]);
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
        this.clientKafka.emit(CONSTANTS.TOPICS.FREE_TOKEN_CREATED_SUCCESS_EVENT, JSON.stringify(event));
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
        const errorObj = Utils.getErrorObj(event.error);
        event['errorObj'] = errorObj;
        this.clientKafka.emit(CONSTANTS.TOPICS.FREE_TOKEN_CREATED_FAILED_EVENT, JSON.stringify(event));
        Logger.log(errorObj, 'FreeTokenCreatedFailedEvent');
    }
}
