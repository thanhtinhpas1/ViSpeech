import { CanActivate } from '@nestjs/common';
import { AuthService } from 'auth/auth.service';
export declare class TokenGuard implements CanActivate {
    private readonly authService;
    constructor(authService: AuthService);
    canActivate(context: import('@nestjs/common').ExecutionContext): Promise<boolean>;
}
