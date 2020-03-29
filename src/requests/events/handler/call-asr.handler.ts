import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { RequestDto } from 'requests/dtos/requests.dto';
import { Repository } from 'typeorm';
import { CallAsrEvent } from '../impl/call-asr.event';

@EventsHandler(CallAsrEvent)
export class CallAsrHandler implements IEventHandler<CallAsrEvent> {
    constructor(
        @InjectRepository(RequestDto)
        private readonly requestRepository: Repository<RequestDto>
    ) {
    }

    async handle(event: CallAsrEvent) {
        Logger.log(event.tokenDto._id, 'CallAsrEvent');
        const { streamId, requestDto, tokenDto } = event;
        try {
            await this.requestRepository.save(requestDto);
        } catch (error) {
            Logger.error(error, '', 'CallAsrEvent');
        }
    }
}
