import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PermissionAssignEmailSentSuccessEvent } from 'permissions/events/impl/permission-assign-email-sent.event';
import { CreatePermissionCommand } from 'permissions/commands/impl/create-permission.command';
import { PermissionDto } from 'permissions/dtos/permissions.dto';

@Injectable()
export class PermissionsSagas {
    @Saga()
    permissionAssignEmailSentSuccess = (events$: Observable<any>): Observable<ICommand> => {
        return events$.pipe(
            ofType(PermissionAssignEmailSentSuccessEvent),
            map(event => {
                Logger.log('Inside [PermissionsSagas] permissionAssignEmailSentSuccess Saga', 'PermissionsSagas');
                const { streamId, permissionAssignDto, permissionId } = event;
                const { permissions, assignerId, projectId, assigneeId } = permissionAssignDto;
                const permissionDto = new PermissionDto(permissions, assigneeId, assignerId, projectId);
                permissionDto._id = permissionId;
                return new CreatePermissionCommand(streamId, permissionDto);
            })
        );
    };
}
