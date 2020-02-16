import { Injectable, Logger } from "@nestjs/common";
import { ICommand, Saga, ofType } from "@nestjs/cqrs";
import { TokenCreatedEvent } from "../events/impl/token-created.event";
import { WelcomeTokenCommand } from "../commands/impl/welcome-token.command";
import { delay, map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable()
export class TokensSagas {
  // @Saga()
  // tokenCreated = (events$: Observable<any>): Observable<ICommand> => {
  //   return events$.pipe(
  //     ofType(TokenCreatedEvent),
  //     delay(1000),
  //     map(event => {
  //       Logger.log("Inside [TokensSagas] Saga", "TokensSagas");
  //       const tokenId = event.tokenDto[0].id;
  //       return new WelcomeTokenCommand(tokenId);
  //     })
  //   );
  // };
}
