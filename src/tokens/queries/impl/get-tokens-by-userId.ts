import {IsString} from 'class-validator';

export class GetTokensByUserIdQuery {
  @IsString()
  userId: string;
}
