import { BaseEntityDto } from 'base/base-entity.dto';
import { IsArray, IsEmail, IsEmpty, IsNotEmpty, IsOptional, IsString, IsBoolean } from 'class-validator';
import { RoleDto } from 'roles/dtos/roles.dto';
import { Column, Entity, Index } from 'typeorm';

export class UserIdRequestParamsDto {
    constructor(userId) {
        this._id = userId;
    }

    @IsString()
    @IsOptional()
    _id: string;
}

export class ChangePasswordBody {
    @IsNotEmpty()
    @IsString()
    readonly userId;

    @IsNotEmpty()
    @IsString()
    readonly oldPassword;

    @IsNotEmpty()
    @IsString()
    readonly newPassword;
}

@Entity('users')
export class UserDto extends BaseEntityDto {
    constructor(firstName: string, lastName: string, username: string, password: string, email: string, roles: RoleDto[]) {
        super();
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
        this.email = email;
        this.roles = roles;
        this.isActive = true;
    }

    @IsString()
    @IsNotEmpty()
    @Column()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    @Column()
    lastName: string;

    @IsString()
    @IsNotEmpty()
    @Index({ unique: true })
    @Column({ nullable: false, update: false })
    username: string;

    @IsOptional()
    @IsString()
    @Column({
        select: false, nullable: false,
    })
    password: string;

    @IsEmail()
    @IsNotEmpty()
    @Column({
        unique: true, update: false,
    })
    email: string;

    @IsEmpty()
    @Column({
        default: true,
        nullable: true,
        insert: false,
    })
    firstTimeLoginRemaining: boolean;

    @IsNotEmpty()
    @IsBoolean()
    @Column({
        default: true,
        nullable: false,
    })
    isActive: boolean;

    @IsArray()
    @IsOptional()
    @Column()
    roles: RoleDto[];
}
