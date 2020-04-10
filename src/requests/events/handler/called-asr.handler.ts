import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { RequestDto } from 'requests/dtos/requests.dto';
import { Repository } from 'typeorm';
import { CalledAsrEvent } from '../impl/call-asr.event';

@EventsHandler(CalledAsrEvent)
export class CalledAsrHandler implements IEventHandler<CalledAsrEvent> {
    constructor(
        @InjectRepository(RequestDto)
        private readonly requestRepository: Repository<RequestDto>
    ) {
    }

    async handle(event: CalledAsrEvent) {
        Logger.log(event.tokenDto._id, 'CalledAsrEvent');
        const { streamId, requestDto, tokenDto } = event;
        try {
            requestDto.duration = Number(requestDto.duration);
            requestDto.createdDate = new Date(Date.now());
            await this.requestRepository.save(requestDto);
        } catch (error) {
            Logger.error(error, '', 'CalledAsrEvent');
        }
    }
}
