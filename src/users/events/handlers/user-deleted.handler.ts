import { Inject, Logger, NotFoundException } from '@nestjs/common';
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
        const { streamId, userId } = event;

        try {
            const user = await this.repository.findOne({ _id: userId });
            if (!user) {
                throw new NotFoundException(`User with _id ${userId} does not exist.`);
            }
            await this.repository.delete({ _id: userId });
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
        const errorObj = Utils.getErrorObj(event.error)
        event['errorObj'] = errorObj
        this.clientKafka.emit(CONSTANTS.TOPICS.USER_DELETED_FAILED_EVENT, JSON.stringify(event));
        Logger.log(errorObj, 'UserDeletedFailedEvent');
    }
}
