import { ICommand } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
export declare class PermissionsSagas {
    permissionAssignEmailSentSuccess: (events$: Observable<any>) => Observable<ICommand>;
}
