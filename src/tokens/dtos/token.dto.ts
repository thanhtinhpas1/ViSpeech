import { Entity, PrimaryGeneratedColumn, ObjectID, Column } from "typeorm";
import { IsEmpty, IsString, IsNotEmpty } from "class-validator";

@Entity("tokens")
export class TokenDto {
    
    @IsEmpty()
    @PrimaryGeneratedColumn('uuid')
    tokenId: ObjectID;

    @IsString()
    @IsNotEmpty()
    @Column({
    })
    value: string;

    @IsString()
    @IsEmpty()
    @Column({
        name: "created_date",
        default: (new Date()).getTime()
    })
    createdDate: Date

    @IsString()
    @IsNotEmpty()
    @Column({
        name: "user_id"
    })
    userId: string

}