import { Injectable, Logger } from "@nestjs/common";
import { ICommand, ofType, Saga } from "@nestjs/cqrs";
import { delay, map, flatMap } from "rxjs/operators";
import { Observable } from "rxjs";
import {
  UserCreationStartedEvent,
  UserCreatedSuccessEvent
} from "users/events/impl/user-created.event";
import { CreateFreeTokenCommand } from "tokens/commands/impl/create-token.command";
import { TokenDto } from "tokens/dtos/tokens.dto";
import { AuthService } from "auth/auth.service";
import { CreateUserCommand } from "users/commands/impl/create-user.command";
import { WelcomeUserCommand } from "users/commands/impl/welcome-user.command";
import { DeleteUserCommand } from "users/commands/impl/delete-user.command";
import { DeleteTokenCommand } from "tokens/commands/impl/delete-token.command";
import { FreeTokenCreatedSuccessEvent, FreeTokenCreatedFailEvent } from "tokens/events/impl/free-token-created.event";

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
  userCreatedSucess = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(UserCreatedSuccessEvent),
      map((event: UserCreatedSuccessEvent) => {
        Logger.log("Inside [UsersSagas] userCreatedSucess Saga", "UsersSagas");
        const transactionId = event.transactionId;
        const userId = event.userDto._id;
        const tokenValue = this.authService.generate_token_with_userId(userId);
        const tokenDto = new TokenDto(tokenValue, userId); // free token
        return new CreateFreeTokenCommand(transactionId, tokenDto);
      })
    );
  };

  @Saga()
  freeTokenCreatedSuccess = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(FreeTokenCreatedSuccessEvent),
      map((event: FreeTokenCreatedSuccessEvent) => {
        Logger.log("Inside [UsersSagas] freeTokenCreatedSuccess Saga", "UsersSagas");
        const userId = event.tokenDto.userId;
        return new WelcomeUserCommand(userId);
      })
    );
  };

  @Saga()
  freeTokenCreatedFail = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(FreeTokenCreatedFailEvent),
      flatMap((event: FreeTokenCreatedFailEvent) => {
        Logger.log("Inside [UsersSagas] freeTokenCreatedFail Saga", "UsersSagas");

        const commands = [
          new DeleteTokenCommand(event.transactionId, null),
          new DeleteUserCommand(event.transactionId, null),
        ]

        return commands;
      })
    );
  };
}
