import { RequestDto } from 'requests/dtos/requests.dto';
import { RequestModel } from 'requests/models/request.model';
import { TokenDto } from 'tokens/dtos/tokens.dto';
export declare class RequestRepository {
    createRequest(streamId: string, requestDto: RequestDto, tokenDto: TokenDto): Promise<RequestModel>;
}
