import { Injectable, Logger } from '@nestjs/common';
import { ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { AsrCalledEvent } from 'requests/events/impl/asr-called.event';
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
    callAsrServiceSaga = (events$: Observable<any>): Observable<void> => {
        return events$.pipe(
            ofType(AsrCalledEvent),
            map((event: AsrCalledEvent) => {
                Logger.log('Inside [RequestSagas] callAsrService Saga', 'RequestSagas');
                const {streamId, requestDto, tokenDto} = event;
                // if (tokenDto.usedMinutes - requestDto.duration > 0) { // not first time call
                //     return [new UpdateTokenCommand(streamId, tokenDto)];
                // }
                if (requestDto.status === CONSTANTS.STATUS.SUCCESS) {
                    const updateTokenEvent = new TokenUpdatedEvent(streamId, tokenDto);
                    updateTokenEvent['eventType'] = 'TokenUpdatedEvent';
                    this.eventStore.publish(updateTokenEvent, '$ce-token')
                        .then(() => Logger.log('Sent TokenUpdatedEvent.'));
                }
                // else do nothing
            })
        );
    };
}