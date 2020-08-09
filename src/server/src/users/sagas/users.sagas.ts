import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';
import { EventStore } from '../../core/event-store/lib';
import { UserCreatedSuccessEvent } from '../events/impl/user-created.event';
import { UserDeletedSuccessEvent } from '../events/impl/user-deleted.event';
import { CreateFreeTokenCommand } from '../../tokens/commands/impl/create-token.command';
import { DeleteTokenByUserIdCommand } from '../../tokens/commands/impl/delete-token-by-userId.command';
import { DeleteProjectByUserIdCommand } from '../../projects/commands/impl/delete-project-by-userId.command';
import { DeletePermissionByUserIdCommand } from '../../permissions/commands/impl/delete-permission-by-userId.command';

@Injectable()
export class UsersSagas {
    constructor(
        private readonly eventStore: EventStore
    ) {
    }

    @Saga()
    userCreatedSuccess = (events$: Observable<any>): Observable<ICommand> => {
        return events$.pipe(
            ofType(UserCreatedSuccessEvent),
            map((event: UserCreatedSuccessEvent) => {
                Logger.log('Inside [UsersSagas] userCreatedSuccess Saga', 'UsersSagas');
                const { streamId, freeToken } = event;
                return new CreateFreeTokenCommand(streamId, freeToken);
                // freeTokenCreatedEvent['eventType'] = 'FreeTokenCreatedEvent';
                // this.eventStore.publish(freeTokenCreatedEvent, CONSTANTS.STREAM_NAME.TOKEN);
            })
        );
    };

    @Saga()
    userDeletedSuccess = (events$: Observable<any>): Observable<ICommand> => {
        return events$.pipe(
            ofType(UserDeletedSuccessEvent),
            flatMap((event: UserDeletedSuccessEvent) => {
                Logger.log('Inside [UsersSagas] userDeletedSuccess Saga', 'UsersSagas');
                const { streamId, userId } = event;
                // remove token
                const tokenDeletedCommand = new DeleteTokenByUserIdCommand(streamId, userId);
                // tokenDeletedEvent['eventType'] = 'TokenDeletedByUserIdEvent';
                // this.eventStore.publish(tokenDeletedEvent, CONSTANTS.STREAM_NAME.TOKEN);
                // remove project
                const projectDeletedCommand = new DeleteProjectByUserIdCommand(streamId, userId);
                // projectDeletedEvent['eventType'] = 'ProjectDeletedByUserIdEvent';
                // this.eventStore.publish(projectDeletedEvent, CONSTANTS.STREAM_NAME.PROJECT);
                // remove permission
                const permissionDeletedCommand = new DeletePermissionByUserIdCommand(streamId, userId);
                // permissionDeletedEvent['eventType'] = 'PermissionDeletedByUserIdEvent';
                // this.eventStore.publish(permissionDeletedEvent, CONSTANTS.STREAM_NAME.PERMISSION);
                return [tokenDeletedCommand, projectDeletedCommand, permissionDeletedCommand];
            })
        );
    };
}