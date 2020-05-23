import {IsEmpty} from 'class-validator';
import {CreateDateColumn, ObjectIdColumn, UpdateDateColumn,} from 'typeorm';
import {Utils} from '../utils';
import { ErrUtil } from "../utils/err.util";
import { ERR } from "../common/error";

export class BaseEntityDto {
    constructor() {
        this._id = Utils.getUuid();
    }

    @ObjectIdColumn()
    _id: string;

    @IsEmpty(ErrUtil.getMessage('createdDate', ERR.IsEmpty))
    @CreateDateColumn({
        name: 'created_date',
    })
    createdDate: Date;

    @IsEmpty(ErrUtil.getMessage('updatedDate', ERR.IsEmpty))
    @UpdateDateColumn({
        name: 'updated_date',
    })
    updatedDate: Date;
}
