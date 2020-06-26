import {ICommand} from '@nestjs/cqrs';
import {PermissionDto} from '../../dtos/permissions.dto';

export class CreatePermissionCommand implements ICommand {
    constructor(
        public readonly streamId: string,
        public readonly permissionDto: PermissionDto,
    ) {
    }
}

export class CreateFreePermissionCommand implements ICommand {
    constructor(
        public readonly streamId: string,
        public readonly permissionDto: PermissionDto,
    ) {
    }
}

export class CreateOrderedPermissionCommand implements ICommand {
    constructor(
        public readonly streamId: string,
        public readonly permissionDto: PermissionDto,
    ) {
    }
}
