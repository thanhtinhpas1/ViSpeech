import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class FindFreeTokenQuery {
    constructor(userId: string) {
        this.userId = userId;
    }

    @IsNotEmpty()
    @IsUUID()
    @IsString()
    userId: string;
}
