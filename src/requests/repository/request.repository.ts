import { Injectable } from '@nestjs/common';
import { RequestDto } from 'requests/dtos/requests.dto';
import { RequestModel } from 'requests/models/request.model';
import { TokenDto } from 'tokens/dtos/tokens.dto';

@Injectable()
export class RequestRepository {
    async createRequest(streamId: string, requestDto: RequestDto, tokenDto: TokenDto) {
        const request = new RequestModel(requestDto._id);
        request.setData(requestDto);
        request.createReport(streamId, tokenDto);
        return request;
    }
}
