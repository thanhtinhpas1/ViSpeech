import { Inject, Logger } from '@nestjs/common';
import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { CONSTANTS } from 'common/constant';
import { Repository } from 'typeorm';
import { UserDto } from 'users/dtos/users.dto';
import { config } from '../../../../config';
import { UserDeletedEvent, UserDeletedFailedEvent, UserDeletedSuccessEvent } from '../impl/user-deleted.event';
import { Utils } from 'utils';

@EventsHandler(UserDeletedEvent)
export class UserDeletedHandler implements IEventHandler<UserDeletedEvent> {
    constructor(
        private readonly eventBus: EventBus,
        @InjectRepository(UserDto) private readonly repository: Repository<UserDto>
    ) {
    }

    async handle(event: UserDeletedEvent) {
        Logger.log(event.userId, 'UserDeletedEvent');
        const { streamId, userId, isDeleted } = event;

        try {
            if (Utils.convertToBoolean(isDeleted)) {
                await this.repository.delete({ _id: userId });
            } else {
                await this.repository.update({ _id: userId }, { isActive: false, updatedDate: new Date() });
            }

            this.eventBus.publish(new UserDeletedSuccessEvent(streamId, userId));
        } catch (error) {
            this.eventBus.publish(new UserDeletedFailedEvent(streamId, userId, error));
        }
    }
}

@EventsHandler(UserDeletedSuccessEvent)
export class UserDeletedSuccessHandler implements IEventHandler<UserDeletedSuccessEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
        this.clientKafka.connect();
    }

    handle(event: UserDeletedSuccessEvent) {
        this.clientKafka.emit(CONSTANTS.TOPICS.USER_DELETED_SUCCESS_EVENT, JSON.stringify(event));
        Logger.log(event.userId, 'UserDeletedSuccessEvent');
    }
}

@EventsHandler(UserDeletedFailedEvent)
export class UserDeletedFailedHandler implements IEventHandler<UserDeletedFailedEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
        this.clientKafka.connect();
    }

    handle(event: UserDeletedFailedEvent) {
        const errorObj = Utils.getErrorObj(event.error);
        event['errorObj'] = errorObj;
        this.clientKafka.emit(CONSTANTS.TOPICS.USER_DELETED_FAILED_EVENT, JSON.stringify(event));
        Logger.log(errorObj, 'UserDeletedFailedEvent');
    }
}
