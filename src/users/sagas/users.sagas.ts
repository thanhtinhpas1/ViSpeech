import { Injectable, Logger } from "@nestjs/common";
import { ICommand, Saga, ofType } from "@nestjs/cqrs";
import { UserCreatedEvent } from "../events/impl/user-created.event";
import { TokenDto } from "tokens/dtos/tokens.dto";
import { delay, map } from "rxjs/operators";
import { Observable } from "rxjs";
import { AuthService } from "auth/auth.service";
import { TokensService } from "tokens/services/tokens.service";
import { CreateTokenCommand } from "tokens/commands/impl/create-token.command";
import { WelcomeUserCommand } from "users/commands/impl/welcome-user.command";

@Injectable()
export class UsersSagas {
  constructor(
    private readonly authService: AuthService,
    private readonly tokensService: TokensService) {}

  @Saga()
  userCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(UserCreatedEvent),
      delay(1000),
      map(event => {
        Logger.log("Inside [UsersSagas] Saga", "UsersSagas");
        const userId = event.userDto[0].userId;
        return new WelcomeUserCommand(userId);
      })
    );
  };
}
