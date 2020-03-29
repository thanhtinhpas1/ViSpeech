import { IEventHandler } from '@nestjs/cqrs';
import { RequestDto } from 'requests/dtos/requests.dto';
import { Repository } from 'typeorm';
import { CallAsrEvent } from '../impl/call-asr.event';
export declare class CallAsrHandler implements IEventHandler<CallAsrEvent> {
    private readonly requestRepository;
    constructor(requestRepository: Repository<RequestDto>);
    handle(event: CallAsrEvent): Promise<void>;
}
