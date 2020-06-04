import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { RequestDto } from 'requests/dtos/requests.dto';
import { Repository } from 'typeorm';
import { AsrCalledEvent } from '../impl/Asr-called.event';

@EventsHandler(AsrCalledEvent)
export class AsrCalledHandler implements IEventHandler<AsrCalledEvent> {
    constructor(
        @InjectRepository(RequestDto)
        private readonly requestRepository: Repository<RequestDto>
    ) {
    }

    async handle(event: AsrCalledEvent) {
        Logger.log(event.tokenDto._id, 'AsrCalledEvent');
        const { streamId, requestDto, tokenDto } = event;
        try {
            requestDto.duration = Number(requestDto.duration);
            await this.requestRepository.save(requestDto);
        } catch (error) {
            Logger.error(error, '', 'AsrCalledEvent');
        }
    }
}
