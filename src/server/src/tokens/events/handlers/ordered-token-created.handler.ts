import { Inject, Logger } from '@nestjs/common';
import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { CONSTANTS } from 'common/constant';
import { TokenTypeDto } from 'tokens/dtos/token-types.dto';
import { TokenDto } from 'tokens/dtos/tokens.dto';
import { getMongoRepository, Repository } from 'typeorm';
import { Utils } from 'utils';
import { config } from '../../../../config';
import { AuthService } from '../../../auth/auth.service';
import { UserDto } from '../../../users/dtos/users.dto';
import { OrderedTokenCreatedEvent, OrderedTokenCreatedFailedEvent, OrderedTokenCreatedSuccessEvent } from '../impl/ordered-token-created.event';

@EventsHandler(OrderedTokenCreatedEvent)
export class OrderedTokenCreatedHandler implements IEventHandler<OrderedTokenCreatedEvent> {
    constructor(
        @InjectRepository(TokenDto)
        private readonly repository: Repository<TokenDto>,
        @InjectRepository(TokenTypeDto)
        private readonly repositoryTokenType: Repository<TokenTypeDto>,
        private readonly eventBus: EventBus,
        private readonly authService: AuthService,
    ) {
    }

    async handle(event: OrderedTokenCreatedEvent) {
        Logger.log(event.tokenDto._id, 'OrderedTokenCreatedEvent');
        const {streamId, tokenDto} = event;
        let token = JSON.parse(JSON.stringify(tokenDto));
        let tokenTypeDto = null;

        try {
            if (token.tokenTypeId) {
                tokenTypeDto = await this.repositoryTokenType.findOne({ _id: token.tokenTypeId });
            } else if (token.tokenType) {
                tokenTypeDto = await this.repositoryTokenType.findOne({ name: token.tokenType });
            }
            token.tokenTypeId = tokenTypeDto?._id;
            token.tokenType = tokenTypeDto?.name;
            token.minutes = Number(tokenTypeDto?.minutes);
            token.usedMinutes = 0;
            token.isValid = Utils.convertToBoolean(token.isValid);
            token = Utils.removePropertiesFromObject(token, [ 'orderId' ]);
            const user = await getMongoRepository(UserDto).findOne({ _id: tokenDto.userId });
            token.value = this.authService.generateToken(user._id, user.username, user.roles);
            await this.repository.save(token);
            this.eventBus.publish(new OrderedTokenCreatedSuccessEvent(streamId, tokenDto, token));
        } catch (error) {
            Logger.error('Ordered create token failed', error.message);
            this.eventBus.publish(new OrderedTokenCreatedFailedEvent(streamId, tokenDto, error));
        }
    }
}

@EventsHandler(OrderedTokenCreatedSuccessEvent)
export class OrderedTokenCreatedSuccessHandler
    implements IEventHandler<OrderedTokenCreatedSuccessEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
        this.clientKafka.connect();
    }

    handle(event: OrderedTokenCreatedSuccessEvent) {
        this.clientKafka.emit(CONSTANTS.TOPICS.ORDERED_TOKEN_CREATED_SUCCESS_EVENT, JSON.stringify(event));
        Logger.log(event.tokenDto._id, 'OrderedTokenCreatedSuccessEvent');
    }
}

@EventsHandler(OrderedTokenCreatedFailedEvent)
export class OrderedTokenCreatedFailedHandler
    implements IEventHandler<OrderedTokenCreatedFailedEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
        this.clientKafka.connect();
    }

    handle(event: OrderedTokenCreatedFailedEvent) {
        const errorObj = Utils.getErrorObj(event.error)
        event['errorObj'] = errorObj
        this.clientKafka.emit(CONSTANTS.TOPICS.ORDERED_TOKEN_CREATED_FAILED_EVENT, JSON.stringify(event));
        Logger.log(errorObj, 'OrderedTokenCreatedFailedEvent');
    }
}
