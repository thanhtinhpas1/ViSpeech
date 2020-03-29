import { ICommand } from "@nestjs/cqrs";
import { Observable } from "rxjs";
export declare class CallAsrSagas {
    constructor();
    startCreatingUser: (events$: Observable<any>) => Observable<ICommand>;
}
