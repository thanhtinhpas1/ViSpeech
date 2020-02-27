import {IsEmpty} from 'class-validator';
import {CreateDateColumn, ObjectID, ObjectIdColumn, UpdateDateColumn} from 'typeorm';
import {Utils} from '../utils';

export class BaseEntityDto {
    constructor() {
        this._id = Utils.getUuid();
    }

    @ObjectIdColumn()
    _id: ObjectID;

    @IsEmpty()
    @CreateDateColumn({
        name: 'created_date',
        nullable: true
    })
    createdDate: Date;

    @IsEmpty()
    @UpdateDateColumn({
        name: 'updated_date',
        nullable: true
    })
    updatedDate;
}
