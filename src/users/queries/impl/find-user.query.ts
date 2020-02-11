import { IsString } from "class-validator";

export class FindUserQuery {
    @IsString()
    _id: string;
}