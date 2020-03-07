import { Injectable, Logger } from "@nestjs/common";
import { ICommand, ofType, Saga } from "@nestjs/cqrs";
import { AuthService } from "auth/auth.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { CreateTokenCommand } from "tokens/commands/impl/create-token.command";
import { TokenDto } from "tokens/dtos/tokens.dto";
import { TokenCreatedEvent } from "tokens/events/impl/token-created.event";
import { CreateUserCommand } from "users/commands/impl/create-user.command";
import { WelcomeUserCommand } from "users/commands/impl/welcome-user.command";
import { UserCreatedEvent, UserCreationStartedEvent } from "users/events/impl/user-created.event";

@Injectable()
export class UsersSagas {
  constructor(private readonly authService: AuthService) { }

  @Saga()
  startCreatingUser = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(UserCreationStartedEvent),
      map((event: UserCreationStartedEvent) => {
        Logger.log("Inside [UsersSagas] startCreatingUser Saga", "UsersSagas");
        const userDto = event.userDto;
        const transactionId = event.transactionId;
        return new CreateUserCommand(transactionId, userDto);
      })
    );
  };

  @Saga()
  userCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(UserCreatedEvent),
      map((event: UserCreatedEvent) => {
        Logger.log("Inside [UsersSagas] userCreated Saga", "UsersSagas");
        const transactionId = event.transactionId;
        const userId = event.userDto._id;
        const tokenValue = this.authService.generate_token_with_userId(userId);
        const tokenDto = new TokenDto(tokenValue, userId); // free token
        return new CreateTokenCommand(transactionId, tokenDto);
      })
    );
  };

  @Saga()
  tokenCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(TokenCreatedEvent),
      map((event: TokenCreatedEvent) => {
        if (event.tokenDto.tokenType)
          Logger.log("Inside [UsersSagas] tokenCreated Saga", "UsersSagas");
        const userId = event.tokenDto.userId;
        return new WelcomeUserCommand(userId);
      })
    );
  };

  // @Saga()
  // tokenCreatedFail = (events$: Observable<any>): Observable<ICommand> => {
  //   return events$.pipe(
  //     ofType(TokenCreatedFailEvent),
  //     map((event: TokenCreatedFailEvent) => {
  //       Logger.log("Inside [UsersSagas] tokenCreatedFail Saga", "UsersSagas");
  //       Logger.error(event, "", "UsersSagas");
  //       return new DeleteUserCommand(event.transactionId, null);
  //     })
  //   );
  // };
}
