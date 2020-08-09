import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProjectDeletedSuccessEvent } from 'projects/events/impl/project-deleted.event';
import { EventStore } from '../../core/event-store/lib';
import { DeleteTokenByProjectIdCommand } from '../../tokens/commands/impl/delete-token-by-projectId.command';

@Injectable()
export class ProjectsSagas {
    constructor(
        private readonly eventStore: EventStore,
    ) {
    }

    @Saga()
    projectDeletedSuccess = (events$: Observable<any>): Observable<ICommand> => {
        return events$.pipe(
            ofType(ProjectDeletedSuccessEvent),
            map(event => {
                Logger.log('Inside [ProjectsSagas] ProjectDeletedSuccessEvent Saga', 'ProjectsSagas');
                const { streamId, projectId } = event;
                return new DeleteTokenByProjectIdCommand(streamId, projectId);
                // deleteTokenEvent['eventType'] = 'TokenDeletedByProjectIdEvent';
                // this.eventStore.publish(deleteTokenEvent, CONSTANTS.STREAM_NAME.TOKEN);
            })
        );
    };
}
