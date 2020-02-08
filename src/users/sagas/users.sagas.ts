import { Injectable, Logger } from '@nestjs/common';
import { ICommand, Saga, ofType } from '@nestjs/cqrs';
import { UserCreatedEvent } from '../events/impl/user-created.event';
import { WelcomeUserCommand } from '../commands/impl/welcome-user.command';
import { delay, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class UsersSagas {
  @Saga()
  userCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$
    .pipe(
      ofType(UserCreatedEvent),
      delay(1000),
        map(event => {
          Logger.log('Inside [UsersSagas] Saga', 'UsersSagas');
          const userId = event.user[0].userId | event.user[0].username;
          return new WelcomeUserCommand(userId);
        }),
      );
  }
}
