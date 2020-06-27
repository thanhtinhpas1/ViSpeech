import { ICommand } from '@nestjs/cqrs';
import { TokenDto } from '../../dtos/tokens.dto';

export class UpdateTokenCommand implements ICommand {
    constructor(
        public readonly streamId: string,
        public readonly tokenDto: TokenDto) {
    }
}
