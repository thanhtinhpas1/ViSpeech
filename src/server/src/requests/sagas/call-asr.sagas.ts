import { Injectable, Logger } from "@nestjs/common";
import { ICommand, ofType, Saga } from "@nestjs/cqrs";
import { Observable } from "rxjs";
import { UpdateTokenCommand } from "tokens/commands/impl/update-token.command";
import { AsrCalledEvent } from "requests/events/impl/asr-called.event";
import { map } from "rxjs/operators";
import { CONSTANTS } from "common/constant";

@Injectable()
export class CallAsrSagas {
    constructor() {
    }

    @Saga()
    callAsrServiceSaga = (events$: Observable<any>): Observable<ICommand> => {
        return events$.pipe(
            ofType(AsrCalledEvent),
            map((event: AsrCalledEvent) => {
                Logger.log('Inside [RequestSagas] callAsrService Saga', 'RequestSagas');
                const {streamId, requestDto, tokenDto} = event;
                // if (tokenDto.usedMinutes - requestDto.duration > 0) { // not first time call
                //     return [new UpdateTokenCommand(streamId, tokenDto)];
                // }
                if (requestDto.status === CONSTANTS.STATUS.SUCCESS) {
                    return new UpdateTokenCommand(streamId, tokenDto);
                }
                return null;
            })
        );
    };
}