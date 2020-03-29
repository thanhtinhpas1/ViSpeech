import { ICommand } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { AuthService } from 'auth/auth.service';
export declare class OrdersSagas {
    private readonly authService;
    constructor(authService: AuthService);
    startCreatingOrder: (events$: Observable<any>) => Observable<ICommand>;
    orderCreatedSuccess: (events$: Observable<any>) => Observable<ICommand>;
    orderedTokenCreatedSuccess: (events$: Observable<any>) => Observable<ICommand>;
    orderedTokenCreatedFailed: (events$: Observable<any>) => Observable<ICommand>;
}
