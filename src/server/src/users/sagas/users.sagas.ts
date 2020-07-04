import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserCreatedSuccessEvent } from 'users/events/impl/user-created.event';
import { WelcomeUserCommand } from '../commands/impl/welcome-user.command';
import { EventStore } from '../../core/event-store/lib';
import { FreeTokenCreatedEvent } from '../../tokens/events/impl/free-token-created.event';
import { UserDeletedSuccessEvent } from '../events/impl/user-deleted.event';
import { TokenDeletedByUserIdEvent } from '../../tokens/events/impl/token-deleted-by-userId.event';
import { ProjectDeletedByUserIdEvent } from '../../projects/events/impl/project-deleted-by-userId.event';
import { PermissionDeletedByUserIdEvent } from '../../permissions/events/impl/permission-deleted-by-userId.event';

@Injectable()
export class UsersSagas {
    constructor(
        private readonly eventStore: EventStore,
    ) {
    }

    @Saga()
    userCreatedSuccess = (events$: Observable<any>): Observable<ICommand> => {
        return events$.pipe(
            ofType(UserCreatedSuccessEvent),
            map((event: UserCreatedSuccessEvent) => {
                Logger.log('Inside [UsersSagas] userCreatedSuccess Saga', 'UsersSagas');
                const {streamId, userDto} = event;
                event['eventType'] = 'FreeTokenCreatedEvent';
                this.eventStore.publish(event, '$ce-token');
                return new WelcomeUserCommand(streamId, userDto._id);
            })
        );
    };

    @Saga()
    userDeletedSuccess = (events$: Observable<any>): Observable<ICommand> => {
        return events$.pipe(
            ofType(UserDeletedSuccessEvent),
            map((event: UserDeletedSuccessEvent) => {
                Logger.log('Inside [UsersSagas] userDeletedSuccess Saga', 'UsersSagas');
                const {streamId, userId} = event;
                // remove token
                const deleteTokenEvent = new TokenDeletedByUserIdEvent(streamId, userId);
                deleteTokenEvent['eventType'] = 'TokenDeletedByUserIdEvent';
                this.eventStore.publish(deleteTokenEvent, '$ce-token');
                // remove project
                const deleteProjectEvent = new ProjectDeletedByUserIdEvent(streamId, userId);
                deleteProjectEvent['eventType'] = 'ProjectDeletedByUserIdEvent';
                this.eventStore.publish(deleteProjectEvent, '$ce-project');
                // remove permission
                const deletePermissionEvent = new PermissionDeletedByUserIdEvent(streamId, userId);
                deletePermissionEvent['eventType'] = 'PermissionDeletedByUserIdEvent';
                this.eventStore.publish(deletePermissionEvent, '$ce-permission');
                return null;
            })
        );
    };
}