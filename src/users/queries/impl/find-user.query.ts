import {IsString} from 'class-validator';

export class FindUserQuery {
  @IsString()
  userId: string;
}
