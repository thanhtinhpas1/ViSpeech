import { QueryBus } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'users/dtos/users.dto';
export declare class AuthService {
    private readonly jwtService;
    private readonly queryBus;
    constructor(jwtService: JwtService, queryBus: QueryBus);
    validateUser(username: string, pass: string): Promise<any>;
    validateUserId(userId: string): Promise<import("@nestjs/cqrs").IQueryResult>;
    generateToken(userId: any, username: any, roles: any): string;
    generateTokenWithUserId(userId: any, expiresIn?: any): string;
    generateEmailToken(assignerId: any, projectId: any, assigneeId: any, permissions: any): string;
    findUserByUsername(username: string): Promise<UserDto>;
    decodeJwtToken(jwt: any): string | {
        [key: string]: any;
    };
    decode(request: any): string | {
        [key: string]: any;
    };
}
