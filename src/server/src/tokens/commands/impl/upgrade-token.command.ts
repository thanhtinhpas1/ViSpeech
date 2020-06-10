import {ICommand} from '@nestjs/cqrs';
import { TokenTypeDto } from 'tokens/dtos/token-types.dto';

export class UpgradeTokenCommand implements ICommand {
    constructor(
        public readonly streamId: string,
        public readonly id: string,
        public readonly tokenTypeDto: TokenTypeDto) {
    }
}
