import {IsNotEmpty, IsString} from 'class-validator';

export class FindTokenQuery {
    @IsNotEmpty()
    @IsString()
    id: string;
}
