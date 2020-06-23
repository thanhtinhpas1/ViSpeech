import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProjectDeletedSuccessEvent } from 'projects/events/impl/project-deleted.event';
import { DeleteTokenByProjectIdCommand } from 'tokens/commands/impl/delete-token-by-projectId.command';

@Injectable()
export class ProjectsSagas {
    @Saga()
    projectDeletedSuccess = (events$: Observable<any>): Observable<ICommand> => {
        return events$.pipe(
            ofType(ProjectDeletedSuccessEvent),
            map(event => {
                Logger.log("Inside [ProjectsSagas] ProjectDeletedSuccessEvent Saga", "ProjectsSagas");
                const {streamId, projectId} = event;
                return new DeleteTokenByProjectIdCommand(streamId, projectId);
            })
        );
    };
}
