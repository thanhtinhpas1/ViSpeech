import { IEventHandler, EventsHandler } from "@nestjs/cqrs";
import { UserWelcomedEvent } from "../impl/user-welcomed.event";
import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TokenDto } from "tokens/dtos/tokens.dto";
import { Repository } from "typeorm";
import { TokensService } from "tokens/services/tokens.service";
import { AuthService } from "auth/auth.service";
import { TokenTypesService } from "tokens/services/token-types.service";

@EventsHandler(UserWelcomedEvent)
export class UserWelcomedHandler implements IEventHandler<UserWelcomedEvent> {
  constructor(
    private readonly tokensService: TokensService,
    private readonly authService: AuthService,
    private readonly tokenTypesService: TokenTypesService
  ) {}

  async handle(event: UserWelcomedEvent) {
    try {
      Logger.log(event, "UserWelcomedEvent");
      const tokenValue = this.authService.generate_token_with_userId(
        event.userId
      );
      const tokenDto = new TokenDto(tokenValue, event.userId);
      const freeTokenType = await this.tokenTypesService.findByName("free");
      tokenDto.tokenType = freeTokenType;
      this.tokensService.createToken(tokenDto);
    } catch (error) {
      Logger.error(error, "UserWelcomedHandler");
    }
  }
}
