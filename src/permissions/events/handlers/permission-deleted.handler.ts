import {Logger, NotFoundException} from '@nestjs/common';
import {EventsHandler, IEventHandler} from '@nestjs/cqrs';
import {InjectRepository} from '@nestjs/typeorm';
import {PermissionDto} from 'permissions/dtos/permissions.dto';
import {PermissionDeletedEvent} from '../impl/permission-deleted.event';
import {Repository} from 'typeorm';
import { CONSTANTS } from 'common/constant';

@EventsHandler(PermissionDeletedEvent)
export class PermissionDeletedHandler implements IEventHandler<PermissionDeletedEvent> {
    constructor(
        @InjectRepository(PermissionDto)
        private readonly repository: Repository<PermissionDto>
    ) {
    }

    async handle(event: PermissionDeletedEvent) {
        Logger.log(event.permissionId, 'PermissionDeletedEvent');
        const {streamId, permissionId} = event;

        try {
            const permission = await this.repository.findOne({ _id: permissionId });
            if (!permission) {
                throw new NotFoundException(`Permission with _id ${permissionId} does not exist.`);
            }

            return await this.repository.update({_id: permissionId}, { status: CONSTANTS.STATUS.INVALID });
        } catch (error) {
            Logger.error(error, '', 'PermissionDeletedEvent');
        }
    }
}

// TODO: success and failed event
