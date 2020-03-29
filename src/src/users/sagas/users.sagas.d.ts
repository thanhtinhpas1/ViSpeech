import { ICommand } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { AuthService } from 'auth/auth.service';
export declare class UsersSagas {
    private readonly authService;
    constructor(authService: AuthService);
    startCreatingUser: (events$: Observable<any>) => Observable<ICommand>;
    userCreatedSucess: (events$: Observable<any>) => Observable<ICommand>;
    freeTokenCreatedSuccess: (events$: Observable<any>) => Observable<ICommand>;
    freeTokenCreatedFailed: (events$: Observable<any>) => Observable<ICommand>;
    userDeletedSucess: (events$: Observable<any>) => Observable<ICommand>;
}
