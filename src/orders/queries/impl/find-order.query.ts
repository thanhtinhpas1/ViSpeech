import {IsString} from 'class-validator';

export class FindOrderQuery {
  @IsString()
  _id: string;
}
