import { Injectable, Logger } from "@nestjs/common";
import { ICommand, ofType, Saga } from "@nestjs/cqrs";
import { delay, map } from "rxjs/operators";
import { Observable } from "rxjs";
import { UserCreationStartedEvent, UserCreatedFailEvent, UserCreatedEvent, UserTokenCreatedEvent, UserTokenCreatedFailEvent } from "users/events/impl/user-created.event";
import { CreateUserTokenCommand } from "tokens/commands/impl/create-token.command";
import { TokenDto } from "tokens/dtos/tokens.dto";
import { AuthService } from "auth/auth.service";
import { TokenCreatedEvent } from "tokens/events/impl/token-created.event";
import { CreateUserCommand } from "users/commands/impl/create-user.command";
import { WelcomeUserCommand } from "users/commands/impl/welcome-user.command";
import { DeleteUserCommand } from "users/commands/impl/delete-user.command";
import { UserDto } from "users/dtos/users.dto";
import { getMongoRepository } from "typeorm";

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

  @Saga()
  startCreatingUser = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(UserCreationStartedEvent),
      delay(1000),
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
      delay(1000),
      map((event: UserCreatedEvent) => {
        Logger.log("Inside [UsersSagas] userCreated Saga", "UsersSagas");
        Logger.log(event, "UsersSagas");
        const transactionId = event.transactionId;
        const userId = event.userDto._id.toString();
        const tokenValue = this.authService.generate_token_with_userId(userId);
        const tokenDto = new TokenDto(tokenValue, userId);
        return new CreateUserTokenCommand(transactionId, tokenDto);
      })
    );
  };

  @Saga()
  tokenCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(UserTokenCreatedEvent),
      delay(1000),
      map((event: UserTokenCreatedEvent) => {
        Logger.log("Inside [UsersSagas] tokenCreated Saga", "UsersSagas");
        const userId = event.tokenDto.userId;
        return new WelcomeUserCommand(userId);
      })
    );
  };

  @Saga()
  tokenCreatedFail = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(UserTokenCreatedFailEvent),
      delay(1000),
      map((event: UserTokenCreatedFailEvent) => {
        Logger.log("Inside [UsersSagas] tokenCreatedFail Saga", "UsersSagas");
        Logger.error(event.error, "", "UsersSagas error");
        Logger.error(event.transactionId, "", "UsersSagas transactionId");
        return new DeleteUserCommand(event.transactionId, null);
      })
    );
  };
}
