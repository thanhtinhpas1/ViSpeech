import { ICommand } from '@nestjs/cqrs';
import { TokenDto } from '../../dtos/tokens.dto';
export declare class UpdateTokenCommand implements ICommand {
    readonly streamId: string;
    readonly tokenDto: TokenDto;
    constructor(streamId: string, tokenDto: TokenDto);
}
