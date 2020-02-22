import {IsNotEmpty, IsString} from 'class-validator';

export class FindUserQuery {
    @IsNotEmpty()
    @IsString()
    id: string;
}
