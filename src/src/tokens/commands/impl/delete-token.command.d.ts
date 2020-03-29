import { ICommand } from '@nestjs/cqrs';
import { TokenIdRequestParamsDto } from '../../dtos/tokens.dto';
export declare class DeleteTokenCommand implements ICommand {
    readonly streamId: string;
    readonly tokenIdDto: TokenIdRequestParamsDto;
    constructor(streamId: string, tokenIdDto: TokenIdRequestParamsDto);
}
export declare class DeleteTokenByUserIdCommand implements ICommand {
    readonly streamId: string;
    readonly userId: string;
    constructor(streamId: string, userId: string);
}
