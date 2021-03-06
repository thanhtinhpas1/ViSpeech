import { ICommand } from '@nestjs/cqrs';
import { RequestDto } from 'requests/dtos/requests.dto';
import { TokenDto } from 'tokens/dtos/tokens.dto';

export class CallAsrRequestCommand implements ICommand {
    constructor(
        public readonly streamId: string,
        public readonly requestDto: RequestDto,
        public readonly tokenDto: TokenDto,
    ) {
    }
}