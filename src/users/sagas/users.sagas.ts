import { Injectable, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ICommand, EventObservable } from '@nestjs/cqrs';
import { UserCreatedEvent } from '../events/impl/user-created.event';
import { WelcomeUserCommand } from '../commands/impl/welcome-user.command';
import { delay, map } from 'rxjs/operators';

@Injectable()
export class UsersSagas {
  userCreated = (events$: EventObservable<any>): Observable<ICommand> => {
    return events$
      .ofType(UserCreatedEvent)
      .pipe(
        delay(1000),
        map(event => {
          Logger.log('Inside [UsersSagas] Saga', 'UsersSagas');
          const userId = event.user[0].userId | event.user[0].username;
          return new WelcomeUserCommand(userId);
        }),
      );
  }
}
