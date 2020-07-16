import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { $statsCollected, MonitorBeatFailedEvent, MonitorBeatSuccessEvent } from '../impl/monitor-beat.event';
import { Inject, Logger } from '@nestjs/common';
import { getMongoRepository, Repository } from 'typeorm';
import { MonitorDto } from '../../dtos/monitor.dto';
import { config } from '../../../../config';
import { ClientKafka } from '@nestjs/microservices';
import { CONSTANTS } from '../../../common/constant';
import { Utils } from '../../../utils';
import { InjectRepository } from '@nestjs/typeorm';

@EventsHandler($statsCollected)
export class MonitorBeatHandler implements IEventHandler<$statsCollected> {
    private readonly logger = new Logger(this.constructor.name)

    constructor(
        private readonly eventBus: EventBus,
        @InjectRepository(MonitorDto)
        private readonly repository: Repository<MonitorDto>,
    ) {
    }

    async handle(event: $statsCollected) {
        Logger.log(event.streamId, 'MonitorBeatEvent');
        const { streamId, data } = event;
        try {
            const count = await this.repository.count({});
            if (count > 10) {
                const monitor = await this.repository.find({ take: 1, skip: 0, order: { createdDate: 'ASC' } })
                this.repository.delete({ _id: monitor[0]._id });
            }
            const monitor = new MonitorDto(data);
            const savedData = await getMongoRepository(MonitorDto).save(monitor);
            monitor.createdDate = savedData.createdDate
            this.eventBus.publish(new MonitorBeatSuccessEvent(streamId, monitor));
        } catch (error) {
            this.logger.error(error)
            this.eventBus.publish(new MonitorBeatFailedEvent(streamId, data, error));
        }
    }
}

@EventsHandler(MonitorBeatSuccessEvent)
export class MonitorBeatSuccessHandler implements IEventHandler<MonitorBeatSuccessEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
        this.clientKafka.connect();
    }

    handle(event: MonitorBeatSuccessEvent) {
        this.clientKafka.emit(CONSTANTS.TOPICS.MONITOR_BEAT_SUCCESS_EVENT, JSON.stringify(event));
        Logger.log(event.streamId, 'MonitorBeatSuccessEvent');
    }
}

@EventsHandler(MonitorBeatFailedEvent)
export class MonitorBeatFailedHandler implements IEventHandler<MonitorBeatFailedEvent> {
    constructor(
        @Inject(config.KAFKA.NAME)
        private readonly clientKafka: ClientKafka,
    ) {
        this.clientKafka.connect();
    }

    handle(event: MonitorBeatFailedEvent) {
        const errorObj = Utils.getErrorObj(event.error)
        event['errorObj'] = errorObj
        this.clientKafka.emit(CONSTANTS.TOPICS.MONITOR_BEAR_FAILED_EVENT, JSON.stringify(event));
        Logger.log(errorObj, 'MonitorBeatFailedEvent');
    }
}
