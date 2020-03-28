import {IsNotEmpty, IsString} from 'class-validator';

export class FindProjectQuery {
    constructor(id: string) {
        this.id = id;
    }

    @IsNotEmpty()
    @IsString()
    id: string;
}
