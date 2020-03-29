import { IEvent } from '@nestjs/cqrs';
import { RequestDto } from 'requests/dtos/requests.dto';
import { TokenDto } from 'tokens/dtos/tokens.dto';
export declare class CallAsrEvent implements IEvent {
    readonly streamId: string;
    readonly requestDto: RequestDto;
    readonly tokenDto: TokenDto;
    constructor(streamId: string, requestDto: RequestDto, tokenDto: TokenDto);
}
