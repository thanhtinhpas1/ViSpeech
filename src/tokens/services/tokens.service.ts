import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { TokenIdRequestParamsDto } from '../dtos/tokens.dto';
import { TokenDto } from '../dtos/tokens.dto';
import { CreateTokenCommand } from '../commands/impl/create-token.command';
import { UpdateTokenCommand } from '../commands/impl/update-token.command';
import { DeleteTokenCommand } from '../commands/impl/delete-token.command';

@Injectable()
export class TokensService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
    ) {}

  async createToken(token: TokenDto) {
    return await this.commandBus.execute(
      new CreateTokenCommand(token),
    );
  }

  async updateToken(token: TokenDto) {
    return await this.commandBus.execute(
      new UpdateTokenCommand(token),
    );
  }

  async deleteToken(token: TokenIdRequestParamsDto) {
    return await this.commandBus.execute(
      new DeleteTokenCommand(token),
    );
  }

  async findTokens() {
    // TODO
  }

  async findOne(tokenId: TokenIdRequestParamsDto): Promise<TokenDto> {
    // TODO
    return new TokenDto();
  }
}
