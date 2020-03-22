import { IsEmpty } from 'class-validator';
import { CreateDateColumn, ObjectIdColumn, UpdateDateColumn, } from 'typeorm';
import { Utils } from '../utils';

export class BaseEntityDto {
    constructor() {
        this._id = Utils.getUuid();
    }

    @ObjectIdColumn()
    _id: string;

    @IsEmpty()
    @CreateDateColumn({
        name: 'created_date',
    })
    createdDate: Date;

    @IsEmpty()
    @UpdateDateColumn({
        name: 'updated_date',
    })
    updatedDate: Date;
}
