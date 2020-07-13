import { Injectable, Logger } from '@nestjs/common';
import { ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProjectDeletedSuccessEvent } from 'projects/events/impl/project-deleted.event';
import { TokenDeletedByProjectIdEvent } from '../../tokens/events/impl/token-deleted-by-projectId.event';
import { EventStore } from '../../core/event-store/lib';

@Injectable()
export class ProjectsSagas {
    constructor(
        private readonly eventStore: EventStore,
    ) {
    }

    @Saga()
    projectDeletedSuccess = (events$: Observable<any>): Observable<void> => {
        return events$.pipe(
            ofType(ProjectDeletedSuccessEvent),
            map(event => {
                Logger.log("Inside [ProjectsSagas] ProjectDeletedSuccessEvent Saga", "ProjectsSagas");
                const {streamId, projectId} = event;
                const deleteTokenEvent = new TokenDeletedByProjectIdEvent(streamId, projectId);
                deleteTokenEvent['eventType'] = 'TokenDeletedByProjectIdEvent';
                this.eventStore.publish(deleteTokenEvent, '$ce-token');
            })
        );
    };
}
