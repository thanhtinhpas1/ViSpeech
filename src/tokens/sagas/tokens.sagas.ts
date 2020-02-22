import {Injectable} from '@nestjs/common';

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
