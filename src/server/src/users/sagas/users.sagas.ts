import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { flatMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserCreatedSuccessEvent } from 'users/events/impl/user-created.event';
import { TokenDto } from 'tokens/dtos/tokens.dto';
import { AuthService } from 'auth/auth.service';
import { WelcomeUserCommand } from 'users/commands/impl/welcome-user.command';
import { FreeTokenCreatedSuccessEvent } from 'tokens/events/impl/free-token-created.event';
import { UserDeletedSuccessEvent } from 'users/events/impl/user-deleted.event';
import { CreateFreeTokenCommand } from 'tokens/commands/impl/create-token.command';
import { DeleteProjectByUserIdCommand } from 'projects/commands/impl/delete-project-by-userId.command';
import { DeletePermissionByUserIdCommand } from 'permissions/commands/impl/delete-permission-by-userId.command';
import { DeleteTokenByUserIdCommand } from 'tokens/commands/impl/delete-token-by-userId.command';
import { CONSTANTS } from 'common/constant';

@Injectable()
export class UsersSagas {
    constructor(private readonly authService: AuthService) {
    }

    @Saga()
    userCreatedSuccess = (events$: Observable<any>): Observable<ICommand> => {
        return events$.pipe(
            ofType(UserCreatedSuccessEvent),
            map((event: UserCreatedSuccessEvent) => {
                Logger.log('Inside [UsersSagas] userCreatedSuccess Saga', 'UsersSagas');
                const {streamId, userDto} = event;
                const userId = userDto._id;
                const tokenValue = this.authService.generateTokenWithUserId(userId);
                const tokenDto = new TokenDto(tokenValue, userId, "", CONSTANTS.TOKEN_TYPE.FREE); // free token
                return new CreateFreeTokenCommand(streamId, tokenDto);
            })
        );
    };

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
    userDeletedSuccess = (events$: Observable<any>): Observable<ICommand> => {
        return events$.pipe(
            ofType(UserDeletedSuccessEvent),
            flatMap((event: UserDeletedSuccessEvent) => {
                Logger.log('Inside [UsersSagas] userDeletedSuccess Saga', 'UsersSagas');
                const {streamId, userId} = event;
                return [
                    new DeleteTokenByUserIdCommand(streamId, userId),
                    new DeleteProjectByUserIdCommand(streamId, userId),
                    new DeletePermissionByUserIdCommand(streamId, userId)
                ];
            })
        );
    };
}