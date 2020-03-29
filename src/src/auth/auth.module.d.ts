import { QueryBus } from '@nestjs/cqrs';
export declare class AuthModule {
    private readonly query$;
    constructor(query$: QueryBus);
}
