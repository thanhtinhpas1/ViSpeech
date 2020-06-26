import { IsNotEmpty, IsString } from 'class-validator';

export class FindRequestQuery {
    constructor(id: string) {
        this.id = id;
    }

    @IsNotEmpty()
    @IsString()
    id: string;
}
