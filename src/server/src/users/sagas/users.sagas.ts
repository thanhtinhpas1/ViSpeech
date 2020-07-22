import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { AuthService } from 'auth/auth.service';
import { CONSTANTS } from 'common/constant';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TokenDto } from 'tokens/dtos/tokens.dto';
import { FreeTokenCreatedEvent } from 'tokens/events/impl/free-token-created.event';
import { EventStore } from '../../core/event-store/lib';
import { PermissionDeletedByUserIdEvent } from '../../permissions/events/impl/permission-deleted-by-userId.event';
import { ProjectDeletedByUserIdEvent } from '../../projects/events/impl/project-deleted-by-userId.event';
import { TokenDeletedByUserIdEvent } from '../../tokens/events/impl/token-deleted-by-userId.event';
import { UserCreatedSuccessEvent } from '../events/impl/user-created.event';
import { UserDeletedSuccessEvent } from '../events/impl/user-deleted.event';

@Injectable()
export class UsersSagas {
    constructor(
        private readonly eventStore: EventStore,
        private readonly authService: AuthService
    ) {
    }

    @Saga()
    userCreatedSuccess = (events$: Observable<any>): Observable<void> => {
        return events$.pipe(
            ofType(UserCreatedSuccessEvent),
            map((event: UserCreatedSuccessEvent) => {
                Logger.log('Inside [UsersSagas] userCreatedSuccess Saga', 'UsersSagas');
                const { streamId, userDto } = event;
                const userId = userDto._id;
                const tokenValue = this.authService.generateTokenWithUserId(userId);
                const tokenDto = new TokenDto(tokenValue, userId, '', CONSTANTS.TOKEN_TYPE.FREE); // free token
                const freeTokenCreatedEvent = new FreeTokenCreatedEvent(streamId, tokenDto);
                freeTokenCreatedEvent['eventType'] = 'FreeTokenCreatedEvent';
                this.eventStore.publish(freeTokenCreatedEvent, CONSTANTS.STREAM_NAME.TOKEN);
            })
        );
    };

    @Saga()
    userDeletedSuccess = (events$: Observable<any>): Observable<ICommand> => {
        return events$.pipe(
            ofType(UserDeletedSuccessEvent),
            map((event: UserDeletedSuccessEvent) => {
                Logger.log('Inside [UsersSagas] userDeletedSuccess Saga', 'UsersSagas');
                const { streamId, userId } = event;
                // remove token
                const tokenDeletedEvent = new TokenDeletedByUserIdEvent(streamId, userId);
                tokenDeletedEvent['eventType'] = 'TokenDeletedByUserIdEvent';
                this.eventStore.publish(tokenDeletedEvent, CONSTANTS.STREAM_NAME.TOKEN);
                // remove project
                const projectDeletedEvent = new ProjectDeletedByUserIdEvent(streamId, userId);
                projectDeletedEvent['eventType'] = 'ProjectDeletedByUserIdEvent';
                this.eventStore.publish(projectDeletedEvent, CONSTANTS.STREAM_NAME.PROJECT);
                // remove permission
                const permissionDeletedEvent = new PermissionDeletedByUserIdEvent(streamId, userId);
                permissionDeletedEvent['eventType'] = 'PermissionDeletedByUserIdEvent';
                this.eventStore.publish(permissionDeletedEvent, CONSTANTS.STREAM_NAME.PERMISSION);
                return null;
            })
        );
    };
}