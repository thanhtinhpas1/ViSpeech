import { CanActivate } from "@nestjs/common";
import { AuthService } from "../auth.service";
export declare class ReportGuard implements CanActivate {
    private readonly authService;
    constructor(authService: AuthService);
    canActivate(context: import('@nestjs/common').ExecutionContext): boolean | Promise<boolean> | import('rxjs').Observable<boolean>;
}
