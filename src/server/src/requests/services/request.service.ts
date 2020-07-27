import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RequestDto } from 'requests/dtos/requests.dto';
import { TokenDto } from 'tokens/dtos/tokens.dto';
import { FindRequestsQuery } from 'requests/queries/impl/find-requests.query';
import { FindRequestsByUserIdQuery } from 'requests/queries/impl/find-requests-by-userId.query';
import { CallAsrRequestCommand } from 'requests/commands/impl/call-asr-request.command';
import { UpdateRequestTranscriptFileUrlCommand } from 'requests/commands/impl/update-request-transcript-file-url.command';
import { FindRequestQuery } from 'requests/queries/impl/find-request.query';
import HtmlDocx from 'html-docx-js';
import { CreateRequestCommand } from 'requests/commands/impl/create-request.command';

@Injectable()
export class RequestService {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {
    }

    async createRequest(streamId: string, requestDto: RequestDto, tokenDto: TokenDto) {
        return await this.commandBus.execute(new CreateRequestCommand(streamId, requestDto, tokenDto));
    }

    async callAsr(streamId: string, requestDto: RequestDto, tokenDto: TokenDto) {
        return await this.commandBus.execute(new CallAsrRequestCommand(streamId, requestDto, tokenDto));
    }

    async updateRequestTranscriptFileUrl(streamId: string, requestId: string, tokenId: string, url: string) {
        return await this.commandBus.execute(new UpdateRequestTranscriptFileUrlCommand(streamId, requestId, tokenId, url));
    }

    async findOne(findRequestQuery: FindRequestQuery): Promise<RequestDto> {
        const query = new FindRequestQuery(findRequestQuery.id);
        return await this.queryBus.execute(query);
    }

    async findRequests(findRequestsQuery: FindRequestsQuery) {
        const query = new FindRequestsQuery();
        Object.assign(query, findRequestsQuery);
        return await this.queryBus.execute(query);
    }

    async findRequestsByUserId(findRequestsByUserIdQuery: FindRequestsByUserIdQuery) {
        const query = new FindRequestsByUserIdQuery(findRequestsByUserIdQuery.userId);
        Object.assign(query, findRequestsByUserIdQuery);
        return await this.queryBus.execute(query);
    }

    async downloadTranscript(html: string) {
        return HtmlDocx.asBlob(html);
    }
}