import { Injectable } from "@nestjs/common"
import { CommandBus, QueryBus } from "@nestjs/cqrs"
import { RequestDto } from "requests/dtos/requests.dto"
import { TokenDto } from "tokens/dtos/tokens.dto"
import { CallAsrCommand } from "requests/commands/handler/call-asr.command"


@Injectable()
export class RequestService {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) { }

    async createRequest(streamId: string, requestDto: RequestDto, tokenDto: TokenDto) {
        return await this.commandBus.execute(new CallAsrCommand(streamId, requestDto, tokenDto));
    }
}