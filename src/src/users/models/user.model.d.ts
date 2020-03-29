import { AggregateRoot } from '@nestjs/cqrs';
export declare class User extends AggregateRoot {
    private readonly id;
    [x: string]: any;
    constructor(id: string | undefined);
    setData(data: any): void;
    createUserStart(streamId: string): void;
    createUser(streamId: string): void;
    updateUser(streamId: string): void;
    deleteUser(streamId: string): void;
    changePassword(streamId: string, newPassword: string, oldPassword: string): void;
    sendVerifyEmail(streamId: string): void;
    verifyEmail(streamId: string): void;
    welcomeUser(streamId: string): void;
}
