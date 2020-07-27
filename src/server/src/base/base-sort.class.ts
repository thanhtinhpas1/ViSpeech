import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import { CONSTANTS } from 'common/constant';
import { ErrorUtils } from 'utils/errorUtils';
import { ERR } from 'common/error';

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
    @IsIn([CONSTANTS.SORT_ORDER.ASC, CONSTANTS.SORT_ORDER.DESC], { message: ErrorUtils.getMessage('order', ERR.IsIn).message })
    order: string;
}