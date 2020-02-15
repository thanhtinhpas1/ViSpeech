import { IsEmpty } from "class-validator";
import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

export class BaseDto {

    @IsEmpty()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @IsEmpty()
    @CreateDateColumn({
        name: 'created_date',
        nullable: true
    })
    createdDate: Date

    @IsEmpty()
    @UpdateDateColumn({
        name: 'updated_date',
        nullable: true
    })
    updatedDate;
}