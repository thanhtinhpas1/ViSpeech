import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { RequestDto } from 'requests/dtos/requests.dto';
import { Repository } from 'typeorm';
import { AsrCalledRequestEvent } from '../impl/asr-called-request.event';

@EventsHandler(AsrCalledRequestEvent)
export class AsrCalledRequestHandler implements IEventHandler<AsrCalledRequestEvent> {
    constructor(
        @InjectRepository(RequestDto)
        private readonly requestRepository: Repository<RequestDto>
    ) {
    }

    async handle(event: AsrCalledRequestEvent) {
        Logger.log(event.streamId, 'AsrRequestCalledEvent');
        const { requestDto } = event;
        try {
            await this.requestRepository.update({ _id: requestDto._id }, {
                status: requestDto.status,
                updatedDate: new Date()
            });
        } catch (error) {
            Logger.error(error.message, '', 'AsrCalledRequestEvent');
        }
    }
}
