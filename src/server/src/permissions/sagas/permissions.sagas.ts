import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { flatMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PermissionAssignEmailSentSuccessEvent } from 'permissions/events/impl/permission-assign-email-sent.event';
import { CreatePermissionCommand } from 'permissions/commands/impl/create-permission.command';
import { PermissionDto } from 'permissions/dtos/permissions.dto';
import { Utils } from 'utils';

@Injectable()
export class PermissionsSagas {
    @Saga()
    permissionAssignEmailSentSuccess = (events$: Observable<any>): Observable<ICommand> => {
        return events$.pipe(
            ofType(PermissionAssignEmailSentSuccessEvent),
            flatMap(event => {
                Logger.log('Inside [PermissionsSagas] permissionAssignEmailSentSuccess Saga', 'PermissionsSagas');
                const { streamId, permissionAssignDto, permissionIds } = event;
                const { assigneeUsernames, assignerId, projectId, permissions, assigneeIds, expiresIn } = permissionAssignDto;

                // create permissions for many assignees
                const createPermissionCommands = [];
                for (const assigneeId of assigneeIds) {
                    const assigneePermissions = permissions.filter(p => p.assigneeId === assigneeId);
                    const permissionDto = new PermissionDto(assigneePermissions, assigneeId, assignerId, projectId, Utils.getOnlyDate(expiresIn));
                    permissionDto._id = permissionIds.find(id => id.assigneeId === assigneeId)?.id;
                    createPermissionCommands.push(new CreatePermissionCommand(streamId, permissionDto))
                }

                return createPermissionCommands;
            })
        );
    };
}
