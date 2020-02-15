import { IsEmpty } from "class-validator";
import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

export class BaseDto {

    @IsEmpty()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({
        name: 'created_date',
    })
    createdDate: Date

    @UpdateDateColumn({
        name: 'updated_date',
    })
    updatedDate;
}