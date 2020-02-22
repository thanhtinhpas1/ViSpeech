import {IsEmpty} from 'class-validator';
import {CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

export class BaseEntityDto {
    @IsEmpty()
    @PrimaryGeneratedColumn('uuid', {
        name: 'id',
    })
    id: string;

    @IsEmpty()
    @CreateDateColumn({
        name: 'created_date',
        nullable: true,
    })
    createdDate: Date;

    @IsEmpty()
    @UpdateDateColumn({
        name: 'updated_date',
        nullable: true,
    })
    updatedDate;
}
