import { IEvent } from '@nestjs/cqrs';
import { RequestDto } from 'requests/dtos/requests.dto';
import { TokenDto } from 'tokens/dtos/tokens.dto';

export class AsrCalledEvent implements IEvent {
    constructor(
        public readonly streamId: string,
        public readonly requestDto: RequestDto,
        public readonly tokenDto: TokenDto,
    ) {
    }
}
