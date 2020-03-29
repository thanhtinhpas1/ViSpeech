import { ICommand } from "@nestjs/cqrs";
import { RequestDto } from "requests/dtos/requests.dto";
import { TokenDto } from "tokens/dtos/tokens.dto";
export declare class CallAsrCommand implements ICommand {
    readonly streamId: string;
    readonly requestDto: RequestDto;
    readonly tokenDto: TokenDto;
    constructor(streamId: string, requestDto: RequestDto, tokenDto: TokenDto);
}
