import { Injectable, Logger } from "@nestjs/common";
import { ICommand, ofType, Saga } from "@nestjs/cqrs";
import { CalledAsrEvent } from "requests/events/impl/call-asr.event";
import { Observable } from "rxjs";
import { flatMap } from "rxjs/operators";
import { UpdateTokenCommand } from "tokens/commands/impl/update-token.command";

@Injectable()
export class CallAsrSagas {
    constructor() { }

    @Saga()
    callAsrServiceSaga = (events$: Observable<any>): Observable<ICommand> => {
        return events$.pipe(
            ofType(CalledAsrEvent),
            flatMap((event: CalledAsrEvent) => {
                Logger.log('Inside [RequestSagas] callAsrService Saga', 'RequestSagas');
                const { streamId, requestDto, tokenDto } = event;
                if (tokenDto.usedMinutes - requestDto.duration > 0) { // not first time call
                    return [new UpdateTokenCommand(streamId, tokenDto)];
                }
                return [new UpdateTokenCommand(streamId, tokenDto)];
            })
        );
    };
}