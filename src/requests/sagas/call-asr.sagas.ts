import { Injectable, Logger } from "@nestjs/common";
import { ICommand, ofType, Saga } from "@nestjs/cqrs";
import { CallAsrEvent } from "requests/events/impl/call-asr.event";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { UpdateTokenCommand } from "tokens/commands/impl/update-token.command";

@Injectable()
export class CallAsrSagas {
    constructor() { }

    @Saga()
    startCreatingUser = (events$: Observable<any>): Observable<ICommand> => {
        return events$.pipe(
            ofType(CallAsrEvent),
            map((event: CallAsrEvent) => {
                Logger.log('Inside [RequestSagas] callAsr Saga', 'RequestSagas');
                const { streamId, requestDto, tokenDto } = event;
                return new UpdateTokenCommand(streamId, tokenDto);
            })
        );
    };
}