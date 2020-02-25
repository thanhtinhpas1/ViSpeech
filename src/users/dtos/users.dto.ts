import {IsEmail, IsEmpty, IsNotEmpty, IsString} from 'class-validator';
import {Column, Entity, Index} from 'typeorm';
import {BaseEntityDto} from 'base/base-entity.dto';
import {RoleDto} from '../../roles/dtos/roles.dto';

export class UserIdRequestParamsDto {
    constructor(userId) {
        this.id = userId;
    }

    @IsString()
    @IsNotEmpty()
    id: string;
}

@Entity('users')
export class UserDto extends BaseEntityDto {

    @IsString()
    @IsNotEmpty()
    @Column({
        name: 'first_name',
    })
    firstName: string;

    @IsString()
    @IsNotEmpty()
    @Column({
        name: 'last_name',
    })
    lastName: string;

    @IsString()
    @IsNotEmpty()
    @Index({unique: true})
    @Column()
    username: string;

    @IsString()
    @IsNotEmpty()
    @Column()
    password: string;

    @IsEmail()
    @IsNotEmpty()
    @Column({unique: true})
    email: string;

    @IsEmpty()
    @Column({
        default: true,
        name: 'firsttime_login_remaining',
        nullable: true,
    })
    firstTimeLoginRemaining: boolean;

    @IsEmpty()
    @Column({
        default: true,
        nullable: true,
    })
    isActive: boolean;

    @IsNotEmpty()
    @Column(() => RoleDto)
    roles: RoleDto[];
}
