import { AggregateRoot } from '@nestjs/cqrs';
export declare class Permission extends AggregateRoot {
    private readonly id;
    [x: string]: any;
    constructor(id: string | undefined);
    setData(data: any): void;
    createPermission(streamId: string): void;
    updatePermission(streamId: string): void;
    welcomePermission(streamId: string): void;
    deletePermission(streamId: string): void;
    sendAssignPermissionEmail(streamId: string): void;
    replyPermissionAssign(streamId: string): void;
}
