import { Injectable, Logger } from "@nestjs/common";
import { ICommand, ofType, Saga } from "@nestjs/cqrs";
import { delay, map } from "rxjs/operators";
import { Observable } from "rxjs";
import { UserCreationStartedEvent } from "users/events/impl/user-created.event";
import { CreateTokenCommand } from "tokens/commands/impl/create-token.command";
import { TokenDto } from "tokens/dtos/tokens.dto";
import { AuthService } from "auth/auth.service";
import { TokenCreatedEvent } from "tokens/events/impl/token-created.event";
import { CreateUserCommand } from "users/commands/impl/create-user.command";

@Injectable()
export class UsersSagas {
  constructor(
    private readonly authService: AuthService  ) {}

  // @Saga()
  // userCreated = (events$: Observable<any>): Observable<ICommand> => {
  //   return events$.pipe(
  //     ofType(UserCreatedEvent),
  //     delay(1000),
  //     map(event => {
  //       Logger.log("Inside [UsersSagas] Saga", "UsersSagas");
  //       const userId = event.userDto[0].id;
  //       return new WelcomeUserCommand(event.userDto[0]);
  //     })
  //   );
  // };
  // @Saga()
  // tokenCreated = (events$: Observable<any>): Observable<ICommand> => {
  //   return events$.pipe(
  //     ofType(TokenCreatedEvent),
  //     delay(1000),
  //     map(event => {
  //       Logger.log("Inside [UsersSagas] create user Saga", "UsersSagas");
  //       const userDto = event.tokenDto[1];
  //       Logger.log(userDto, "UsersSagas create user");
  //       return new CreateUserCommand(userDto);
  //     })
  //   );
  // };

  @Saga()
  userStartCreation = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(UserCreationStartedEvent),
      delay(1000),
      map(event => {
        Logger.log("Inside [UsersSagas] start create user Saga", "UsersSagas");
        const userDto = event.userDto[0];
        // const tokenValue = this.authService.generate_token_with_userId(
        //   userDto.id
        // );
        // const tokenDto = new TokenDto(tokenValue, userDto.id, null);
        return new CreateUserCommand(userDto);
      })
    );
  };
}
