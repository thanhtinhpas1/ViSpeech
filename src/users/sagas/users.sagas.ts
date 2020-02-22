import {Injectable, Logger} from '@nestjs/common';
import {ICommand, ofType, Saga} from '@nestjs/cqrs';
import {UserCreatedEvent} from '../events/impl/user-created.event';
import {delay, map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {WelcomeUserCommand} from 'users/commands/impl/welcome-user.command';

@Injectable()
export class UsersSagas {
    @Saga()
    userCreated = (events$: Observable<any>): Observable<ICommand> => {
        return events$.pipe(
            ofType(UserCreatedEvent),
            delay(1000),
            map(event => {
                Logger.log('Inside [UsersSagas] Saga', 'UsersSagas');
                const userId = event.userDto[0].id;
                return new WelcomeUserCommand(userId);
            }),
        );
    };
}
