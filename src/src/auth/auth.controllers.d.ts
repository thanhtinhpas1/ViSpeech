import { AuthService } from 'auth/auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(req: any): any;
    getProfile(req: any): any;
    authenticate(req: any): any;
}
