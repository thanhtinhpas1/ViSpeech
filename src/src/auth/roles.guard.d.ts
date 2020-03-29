import { CanActivate } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { QueryBus } from '@nestjs/cqrs';
export declare class RolesGuard implements CanActivate {
    private readonly reflector;
    private readonly jwtService;
    private readonly queryBus;
    constructor(reflector: Reflector, jwtService: JwtService, queryBus: QueryBus);
    canActivate(context: import('@nestjs/common').ExecutionContext): boolean | Promise<boolean> | import('rxjs').Observable<boolean>;
    matchRoles(request: any, roles: string[]): Promise<boolean>;
}
