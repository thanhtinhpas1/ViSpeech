import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import { CONSTANTS } from 'common/constant';

export class BaseSortClass {
    constructor(field: string, order: string) {
        this.field = field;
        this.order = order;
    }

    @IsNotEmpty()
    @IsString()
    field: string;

    @IsNotEmpty()
    @IsString()
    @IsIn([CONSTANTS.SORT_ORDER.ASC, CONSTANTS.SORT_ORDER.DESC])
    order: string;
}