import { AggregateRoot } from '@nestjs/cqrs';
import { AsrCalledEvent } from 'requests/events/impl/asr-called.event';
import { TokenDto } from 'tokens/dtos/tokens.dto';
import { RequestTranscriptFileUrlUpdatedEvent } from 'requests/events/impl/request-transcript-file-url-updated.event';
import { RequestCreatedEvent } from 'requests/events/impl/request-created.event';

export class RequestModel extends AggregateRoot {
    [x: string]: any;

    constructor(private readonly id: string | undefined) {
        super();
    }

    setData(data) {
        this.data = data;
    }

    createRequest(streamId: string, tokenDto: TokenDto) {
        this.apply(new RequestCreatedEvent(streamId, this.data, tokenDto));
    }

    callAsr(streamId: string, tokenDto: TokenDto) {
        this.apply(new AsrCalledEvent(streamId, this.data, tokenDto));
    }

    updateRequestTranscriptFileUrl(streamId: string, requestId: string) {
        this.apply(new RequestTranscriptFileUrlUpdatedEvent(streamId, requestId, this.data));
    }
}
