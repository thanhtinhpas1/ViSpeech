import { BaseEntityDto } from "base/base-entity.dto";
import { IsDate, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString } from "class-validator";
import { Column, Entity } from "typeorm";

@Entity('tasks')
export class TaskDto extends BaseEntityDto {

    @IsString()
    @IsNotEmpty()
    @Column({
        nullable: false,
    })
    name: string;

    @IsDate()
    @IsNotEmpty()
    @Column({
        nullable: false,
    })
    nextRun: Date;

    @IsOptional()
    @IsDate()
    @Column()
    previousRun: Date;

    @IsNotEmpty()
    @IsString()
    @Column({
        nullable: false,
    })
    cron: string;

    @IsOptional()
    @IsInt()
    @IsPositive()
    @Column({
        insert: false,
        default: 0,
    })
    previousRunStatus: PreviousRunStatus;

    @IsOptional()
    @IsString()
    @Column({
        length: 1000,
        type: 'varchar'
    })
    errorLog: string;
}

export enum PreviousRunStatus {
    SUCCESS = "SUCCESS",
    FAILURE = "FAILURE",
}