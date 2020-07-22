import { Injectable, Logger } from '@nestjs/common';
import { ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { AsrCalledRequestEvent } from 'requests/events/impl/asr-called-request.event';
import { map } from 'rxjs/operators';
import { CONSTANTS } from 'common/constant';
import { EventStore } from '../../core/event-store/lib';
import { TokenUpdatedEvent } from '../../tokens/events/impl/token-updated.event';
import { RequestTranscriptFileUrlUpdatedSuccessEvent } from 'requests/events/impl/request-transcript-file-url-updated.event';
import { ConstTaskService } from 'tasks/services/const-task.service';

@Injectable()
export class CallAsrSagas {
    constructor(
        private readonly cronTaskService: ConstTaskService,
        private readonly eventStore: EventStore,
    ) {
    }

    streamId: string = null

    @Saga()
    asrCalledRequest = (events$: Observable<any>): Observable<void> => {
        return events$.pipe(
            ofType(AsrCalledRequestEvent),
            map((event: AsrCalledRequestEvent) => {
                Logger.log('Inside [RequestSagas] asrCalledRequest Saga', 'RequestSagas');
                const {streamId, requestDto, tokenDto} = event;
                // prevent from duplicated events
                if (!this.streamId || this.streamId !== streamId) {
                    if (CONSTANTS.STATUS.SUCCESS === requestDto.status) {
                        this.streamId = streamId
                        // generate report
                        const date = new Date();
                        this.cronTaskService.generateReportsImmediately(date.getDate(), date.getMonth(), date.getFullYear());
                        // update token usedMinutes
                        const updateTokenEvent = new TokenUpdatedEvent(streamId, tokenDto);
                        updateTokenEvent['eventType'] = 'TokenUpdatedEvent';
                        this.eventStore.publish(updateTokenEvent, CONSTANTS.STREAM_NAME.TOKEN);
                    }
                }
                // else do nothing
            })
        );
    };

    @Saga()
    requestTranscriptFileUrlUpdatedSuccess = (events$: Observable<any>): Observable<void> => {
        return events$.pipe(
            ofType(RequestTranscriptFileUrlUpdatedSuccessEvent),
            map((event: RequestTranscriptFileUrlUpdatedSuccessEvent) => {
                Logger.log('Inside [RequestSagas] requestTranscriptFileUrlUpdatedSuccess Saga', 'RequestSagas');
                const {streamId, tokenDto } = event;
                // prevent from duplicated events
                if (!this.streamId || this.streamId !== streamId) {
                    this.streamId = streamId
                    // generate report
                    const date = new Date();
                    this.cronTaskService.generateReportsImmediately(date.getDate(), date.getMonth(), date.getFullYear());
                    // update token usedMinutes
                    const updateTokenEvent = new TokenUpdatedEvent(streamId, tokenDto);
                    updateTokenEvent['eventType'] = 'TokenUpdatedEvent';
                    this.eventStore.publish(updateTokenEvent, CONSTANTS.STREAM_NAME.TOKEN);
                }
            })
        );
    };
}