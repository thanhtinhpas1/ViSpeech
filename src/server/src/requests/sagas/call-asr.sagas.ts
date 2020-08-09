import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { AsrCalledRequestEvent } from 'requests/events/impl/asr-called-request.event';
import { map } from 'rxjs/operators';
import { CONSTANTS } from 'common/constant';
import { EventStore } from '../../core/event-store/lib';
import { RequestTranscriptFileUrlUpdatedSuccessEvent } from 'requests/events/impl/request-transcript-file-url-updated.event';
import { ConstTaskService } from 'tasks/services/const-task.service';
import { UpdateTokenCommand } from '../../tokens/commands/impl/update-token.command';

@Injectable()
export class CallAsrSagas {
    constructor(
        private readonly cronTaskService: ConstTaskService,
        private readonly eventStore: EventStore,
    ) {
    }
    private readonly logger = new Logger(this.constructor.name);

    @Saga()
    asrCalledRequest = (events$: Observable<any>): Observable<ICommand> => {
        return events$.pipe(
            ofType(AsrCalledRequestEvent),
            map((event: AsrCalledRequestEvent) => {
                Logger.log('Inside [RequestSagas] asrCalledRequest Saga', 'RequestSagas');
                const { streamId, requestDto, tokenDto } = event;
                if (CONSTANTS.STATUS.SUCCESS === requestDto.status) {
                    // generate report
                    const date = new Date();
                    this.cronTaskService.generateReportsImmediately(date.getDate(), date.getMonth(), date.getFullYear());
                    // update token usedMinutes
                    return new UpdateTokenCommand(streamId, tokenDto);
                    // updateTokenEvent['eventType'] = 'TokenUpdatedEvent';
                    // this.eventStore.publish(updateTokenEvent, CONSTANTS.STREAM_NAME.TOKEN);
                }
                this.logger.warn('Order with status not success forbidden to request asr')
            })
        );
    };

    @Saga()
    requestTranscriptFileUrlUpdatedSuccess = (events$: Observable<any>): Observable<ICommand> => {
        return events$.pipe(
            ofType(RequestTranscriptFileUrlUpdatedSuccessEvent),
            map((event: RequestTranscriptFileUrlUpdatedSuccessEvent) => {
                Logger.log('Inside [RequestSagas] requestTranscriptFileUrlUpdatedSuccess Saga', 'RequestSagas');
                const { streamId, tokenDto } = event;
                // generate report
                const date = new Date();
                this.cronTaskService.generateReportsImmediately(date.getDate(), date.getMonth(), date.getFullYear());
                // update token usedMinutes
                return new UpdateTokenCommand(streamId, tokenDto);
                // updateTokenEvent['eventType'] = 'TokenUpdatedEvent';
                // this.eventStore.publish(updateTokenEvent, CONSTANTS.STREAM_NAME.TOKEN);
            })
        );
    };
}