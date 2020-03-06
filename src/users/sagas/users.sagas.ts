import { Injectable, Logger } from "@nestjs/common";
import { ICommand, ofType, Saga } from "@nestjs/cqrs";
import { delay, map } from "rxjs/operators";
import { Observable } from "rxjs";
import {
  UserCreationStartedEvent,
  UserCreatedFailEvent,
  UserCreatedEvent
} from "users/events/impl/user-created.event";
import { CreateTokenCommand } from "tokens/commands/impl/create-token.command";
import { TokenDto } from "tokens/dtos/tokens.dto";
import { AuthService } from "auth/auth.service";
import {
  TokenCreatedEvent,
  TokenCreatedFailEvent
} from "tokens/events/impl/token-created.event";
import { CreateUserCommand } from "users/commands/impl/create-user.command";
import { WelcomeUserCommand } from "users/commands/impl/welcome-user.command";
import { DeleteUserCommand } from "users/commands/impl/delete-user.command";

@Injectable()
export class UsersSagas {
  constructor(private readonly authService: AuthService) {}

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
  // startCreatingUser = (events$: Observable<any>): Observable<ICommand> => {
  //   return events$.pipe(
  //     ofType(UserCreationStartedEvent),
  //     delay(1000),
  //     map((event: UserCreationStartedEvent) => {
  //       Logger.log("Inside [UsersSagas] startCreatingUser Saga", "UsersSagas");
  //       const userDto = event.userDto;
  //       const transactionId = event.transactionId;
  //       return new CreateUserCommand(transactionId, userDto);
  //     })
  //   );
  // };

  // @Saga()
  // userCreated = (events$: Observable<any>): Observable<ICommand> => {
  //   return events$.pipe(
  //     ofType(UserCreatedEvent),
  //     delay(1000),
  //     map((event: UserCreatedEvent) => {
  //       Logger.log("Inside [UsersSagas] userCreated Saga", "UsersSagas");
  //       const transactionId = event.transactionId;
  //       const userId = event.userDto._id;
  //       const tokenValue = this.authService.generate_token_with_userId(userId);
  //       const tokenDto = new TokenDto(tokenValue, userId); // free token
  //       return new CreateTokenCommand(transactionId, tokenDto);
  //     })
  //   );
  // };

  // @Saga()
  // tokenCreated = (events$: Observable<any>): Observable<ICommand> => {
  //   return events$.pipe(
  //     ofType(TokenCreatedEvent),
  //     delay(1000),
  //     map((event: TokenCreatedEvent) => {
  //       Logger.log("Inside [UsersSagas] tokenCreated Saga", "UsersSagas");
  //       const userId = event.tokenDto.userId;
  //       return new WelcomeUserCommand(userId);
  //     })
  //   );
  // };

  // @Saga()
  // tokenCreatedFail = (events$: Observable<any>): Observable<ICommand> => {
  //   return events$.pipe(
  //     ofType(TokenCreatedFailEvent),
  //     delay(1000),
  //     map((event: TokenCreatedFailEvent) => {
  //       Logger.log("Inside [UsersSagas] tokenCreatedFail Saga", "UsersSagas");
  //       Logger.error(event, "", "UsersSagas");
  //       return new DeleteUserCommand(event.transactionId, null);
  //     })
  //   );
  // };
}
