import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { RequestDto } from 'requests/dtos/requests.dto';
import { Repository } from 'typeorm';
import { AsrCalledEvent } from '../impl/asr-called.event';

@EventsHandler(AsrCalledEvent)
export class AsrCalledHandler implements IEventHandler<AsrCalledEvent> {
    constructor(
        @InjectRepository(RequestDto)
        private readonly requestRepository: Repository<RequestDto>
    ) {
    }

    async handle(event: AsrCalledEvent) {
        Logger.log(event.streamId, 'AsrCalledEvent');
        const {requestDto} = event;
        try {
            await this.requestRepository.update({_id: requestDto._id}, {status: requestDto.status});
        } catch (error) {
            Logger.error(error.message, '', 'AsrCalledEvent');
        }
    }
}
