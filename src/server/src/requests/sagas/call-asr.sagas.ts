import { Injectable, Logger } from '@nestjs/common';
import { ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { AsrCalledRequestEvent } from 'requests/events/impl/asr-called-request.event';
import { map } from 'rxjs/operators';
import { CONSTANTS } from 'common/constant';
import { EventStore } from '../../core/event-store/lib';
import { TokenUpdatedEvent } from '../../tokens/events/impl/token-updated.event';

@Injectable()
export class CallAsrSagas {
    constructor(
        private readonly eventStore: EventStore,
    ) {
    }

    @Saga()
    asrCalledRequest = (events$: Observable<any>): Observable<void> => {
        return events$.pipe(
            ofType(AsrCalledRequestEvent),
            map((event: AsrCalledRequestEvent) => {
                Logger.log('Inside [RequestSagas] asrCalledRequest Saga', 'RequestSagas');
                const {streamId, requestDto, tokenDto} = event;
                if (requestDto.status === CONSTANTS.STATUS.IN_PROGRESS) {
                    const updateTokenEvent = new TokenUpdatedEvent(streamId, tokenDto);
                    updateTokenEvent['eventType'] = 'TokenUpdatedEvent';
                    this.eventStore.publish(updateTokenEvent, '$ce-token');
                }
                // else do nothing
            })
        );
    };
}