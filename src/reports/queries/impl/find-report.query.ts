import {IsNotEmpty, IsString} from 'class-validator';

export class FindReportQuery {
    @IsNotEmpty()
    @IsString()
    id: string;
}
