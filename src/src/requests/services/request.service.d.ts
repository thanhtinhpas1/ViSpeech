import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { RequestDto } from "requests/dtos/requests.dto";
import { TokenDto } from "tokens/dtos/tokens.dto";
export declare class RequestService {
    private readonly commandBus;
    private readonly queryBus;
    constructor(commandBus: CommandBus, queryBus: QueryBus);
    createRequest(streamId: string, requestDto: RequestDto, tokenDto: TokenDto): Promise<any>;
}
