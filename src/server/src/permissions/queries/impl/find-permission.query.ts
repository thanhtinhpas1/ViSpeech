import { IsNotEmpty, IsString } from 'class-validator';

export class FindPermissionQuery {
    constructor(id: string) {
        this.id = id;
    }

    @IsNotEmpty()
    @IsString()
    id: string;
}
