import { CanActivate } from '@nestjs/common';
import { AuthService } from 'auth/auth.service';
export declare class PermissionGuard implements CanActivate {
    private readonly authService;
    constructor(authService: AuthService);
    canActivate(context: import('@nestjs/common').ExecutionContext): Promise<boolean>;
}
export declare class AssignPermissionGuard implements CanActivate {
    private readonly authService;
    constructor(authService: AuthService);
    canActivate(context: import('@nestjs/common').ExecutionContext): Promise<boolean>;
}
export declare class ReplyPermisisonAssignGuard implements CanActivate {
    private readonly authService;
    constructor(authService: AuthService);
    canActivate(context: import('@nestjs/common').ExecutionContext): Promise<boolean>;
}
