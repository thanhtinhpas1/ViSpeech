import {IsNotEmpty, IsString} from 'class-validator';

export class GetTokensByUserIdQuery {
    @IsNotEmpty()
    @IsString()
    userId: string;
}
