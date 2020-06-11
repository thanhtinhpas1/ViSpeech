import {ICommand} from '@nestjs/cqrs';
import { TokenTypeDto } from 'tokens/dtos/token-types.dto';
import { TokenDto } from 'tokens/dtos/tokens.dto';

export class UpgradeTokenCommand implements ICommand {
    constructor(
        public readonly streamId: string,
        public readonly tokenDto: TokenDto,
        public readonly tokenTypeDto: TokenTypeDto) {
    }
}
