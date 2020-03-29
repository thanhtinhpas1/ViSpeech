import { Injectable, Logger } from "@nestjs/common";
import { ICommand, ofType, Saga } from "@nestjs/cqrs";
import { CalledAsrEvent } from "requests/events/impl/call-asr.event";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { UpdateTokenCommand } from "tokens/commands/impl/update-token.command";

@Injectable()
export class CallAsrSagas {
    constructor() { }

    @Saga()
    callAsrServiceSaga = (events$: Observable<any>): Observable<ICommand> => {
        return events$.pipe(
            ofType(CalledAsrEvent),
            map((event: CalledAsrEvent) => {
                Logger.log('Inside [TokenSagas] callAsr Saga', 'RequestSagas');
                const { streamId, requestDto, tokenDto } = event;
                return new UpdateTokenCommand(streamId, tokenDto);
            })
        );
    };
}