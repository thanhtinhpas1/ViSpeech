import {Injectable, Logger} from '@nestjs/common';
import {ICommand, ofType, Saga} from '@nestjs/cqrs';
import {flatMap, map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {UserCreationStartedEvent} from 'users/events/impl/user-created.event';
import {TokenIdRequestParamsDto} from 'tokens/dtos/tokens.dto';
import {AuthService} from 'auth/auth.service';
import {CreateUserCommand} from 'users/commands/impl/create-user.command';
import {WelcomeUserCommand} from 'users/commands/impl/welcome-user.command';
import {DeleteTokenByUserIdCommand, DeleteTokenCommand} from 'tokens/commands/impl/delete-token.command';
import {FreeTokenCreatedFailedEvent, FreeTokenCreatedSuccessEvent} from 'tokens/events/impl/free-token-created.event';
import {DeleteUserCommand} from 'users/commands/impl/delete-user.command';
import {UserIdRequestParamsDto} from 'users/dtos/users.dto';
import {UserDeletedSuccessEvent} from 'users/events/impl/user-deleted.event';

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
                const {streamId, userDto} = event;
                return new CreateUserCommand(streamId, userDto);
            })
        );
    };

    // @Saga()
    // userCreatedSucess = (events$: Observable<any>): Observable<ICommand> => {
    //     return events$.pipe(
    //         ofType(UserCreatedSuccessEvent),
    //         map((event: UserCreatedSuccessEvent) => {
    //             Logger.log('Inside [UsersSagas] userCreatedSucess Saga', 'UsersSagas');
    //             const { streamId, userDto } = event;
    //             const userId = userDto._id;
    //             const tokenValue = this.authService.generateTokenWithUserId(userId);
    //             const tokenDto = new TokenDto(tokenValue, userId); // free token
    //             return new CreateFreeTokenCommand(streamId, tokenDto);
    //         })
    //     );
    // };

    @Saga()
    freeTokenCreatedSuccess = (events$: Observable<any>): Observable<ICommand> => {
        return events$.pipe(
            ofType(FreeTokenCreatedSuccessEvent),
            map((event: FreeTokenCreatedSuccessEvent) => {
                Logger.log('Inside [UsersSagas] freeTokenCreatedSuccess Saga', 'UsersSagas');
                const {streamId, tokenDto} = event;
                return new WelcomeUserCommand(streamId, tokenDto.userId);
            })
        );
    };

    @Saga()
    freeTokenCreatedFailed = (events$: Observable<any>): Observable<ICommand> => {
        return events$.pipe(
            ofType(FreeTokenCreatedFailedEvent),
            flatMap((event: FreeTokenCreatedFailedEvent) => {
                Logger.log('Inside [UsersSagas] freeTokenCreatedFailed Saga', 'UsersSagas');
                const {streamId, tokenDto} = event;
                const {_id, userId} = tokenDto;
                return [
                    new DeleteTokenCommand(streamId, new TokenIdRequestParamsDto(_id)),
                    new DeleteUserCommand(streamId, new UserIdRequestParamsDto(userId))
                ];
            })
        );
    };

    @Saga()
    userDeletedSucess = (events$: Observable<any>): Observable<ICommand> => {
        return events$.pipe(
            ofType(UserDeletedSuccessEvent),
            map((event: UserDeletedSuccessEvent) => {
                Logger.log('Inside [UsersSagas] userDeletedSucess Saga', 'UsersSagas');
                const {streamId, userId} = event;
                return new DeleteTokenByUserIdCommand(streamId, userId);
            })
        );
    };
}