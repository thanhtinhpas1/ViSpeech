
import { AggregateRoot } from '@nestjs/cqrs';
import { CallAsrEvent } from 'requests/events/impl/call-asr.event';
import { TokenDto } from 'tokens/dtos/tokens.dto';
export class RequestModel extends AggregateRoot {
    [x: string]: any;

    constructor(private readonly id: string | undefined) {
        super();
    }

    setData(data) {
        this.data = data;
    }

    createReport(streamId: string, tokenDto: TokenDto) {
        this.apply(new CallAsrEvent(streamId, this.data, tokenDto));
    }
}
