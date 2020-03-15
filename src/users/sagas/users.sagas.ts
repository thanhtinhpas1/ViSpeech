import {Injectable, Logger} from '@nestjs/common';
import {ICommand, ofType, Saga} from '@nestjs/cqrs';
import {flatMap, map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {UserCreatedSuccessEvent, UserCreationStartedEvent} from 'users/events/impl/user-created.event';
import {CreateFreeTokenCommand} from 'tokens/commands/impl/create-token.command';
import {TokenDto, TokenIdRequestParamsDto} from 'tokens/dtos/tokens.dto';
import {AuthService} from 'auth/auth.service';
import {CreateUserCommand} from 'users/commands/impl/create-user.command';
import {WelcomeUserCommand} from 'users/commands/impl/welcome-user.command';
import {DeleteTokenCommand} from 'tokens/commands/impl/delete-token.command';
import {FreeTokenCreatedFailedEvent, FreeTokenCreatedSuccessEvent} from 'tokens/events/impl/free-token-created.event';
import {DeleteUserCommand} from 'users/commands/impl/delete-user.command';
import {UserIdRequestParamsDto} from 'users/dtos/users.dto';

@Injectable()
export class UsersSagas {
    constructor(private readonly authService: AuthService) {
    }

    @Saga()
    startCreatingUser = (events$: Observable<any>): Observable<ICommand> => {
        return events$.pipe(
            ofType(UserCreationStartedEvent),
            map((event: UserCreationStartedEvent) => {
                Logger.log('Inside [UsersSagas] startCreatingUser Saga', 'UsersSagas');
                return new CreateUserCommand(event._id, event.userDto);
            })
        );
    };

    @Saga()
    userCreatedSucess = (events$: Observable<any>): Observable<ICommand> => {
        return events$.pipe(
            ofType(UserCreatedSuccessEvent),
            map((event: UserCreatedSuccessEvent) => {
                Logger.log('Inside [UsersSagas] userCreatedSucess Saga', 'UsersSagas');
                const {_id} = event.userDto;
                const tokenValue = this.authService.generateTokenWithUserId(_id);
                const tokenDto = new TokenDto(tokenValue, _id); // free token
                return new CreateFreeTokenCommand(tokenDto);
            })
        );
    };

    @Saga()
    freeTokenCreatedSuccess = (events$: Observable<any>): Observable<ICommand> => {
        return events$.pipe(
            ofType(FreeTokenCreatedSuccessEvent),
            map((event: FreeTokenCreatedSuccessEvent) => {
                Logger.log('Inside [UsersSagas] freeTokenCreatedSuccess Saga', 'UsersSagas');
                const {userId} = event.tokenDto;
                return new WelcomeUserCommand(userId);
            })
        );
    };

    @Saga()
    freeTokenCreatedFail = (events$: Observable<any>): Observable<ICommand> => {
        return events$.pipe(
            ofType(FreeTokenCreatedFailedEvent),
            flatMap((event: FreeTokenCreatedFailedEvent) => {
                Logger.log('Inside [UsersSagas] freeTokenCreatedFail Saga', 'UsersSagas');
                const {_id, userId} = event.tokenDto;
                return [
                    new DeleteTokenCommand(new TokenIdRequestParamsDto(_id)),
                    new DeleteUserCommand(new UserIdRequestParamsDto(userId))
                ];
            })
        );
    };
}