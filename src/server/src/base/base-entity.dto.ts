import { IsEmpty } from 'class-validator';
import { CreateDateColumn, ObjectIdColumn, UpdateDateColumn, } from 'typeorm';
import { Utils } from '../utils';
import { ErrorUtils } from "../utils/errorUtils";
import { ERR } from "../common/error";

export class BaseEntityDto {
    constructor() {
        this._id = Utils.getUuid();
    }

    @ObjectIdColumn()
    _id: string;

    @IsEmpty(ErrorUtils.getMessage('createdDate', ERR.IsEmpty))
    @CreateDateColumn({
        name: 'created_date',
    })
    createdDate: Date;

    @IsEmpty(ErrorUtils.getMessage('updatedDate', ERR.IsEmpty))
    @UpdateDateColumn({
        name: 'updated_date',
    })
    updatedDate: Date;
}
