import { CanActivate } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Repository } from 'typeorm';
import { UserDto } from '../../users/dtos/users.dto';
export declare class UserGuard implements CanActivate {
    private readonly authService;
    private userRepository;
    constructor(authService: AuthService, userRepository: Repository<UserDto>);
    canActivate(context: import('@nestjs/common').ExecutionContext): Promise<boolean>;
}
export declare class VerifyEmailGuard implements CanActivate {
    private readonly authService;
    constructor(authService: AuthService);
    canActivate(context: import('@nestjs/common').ExecutionContext): Promise<boolean>;
}
