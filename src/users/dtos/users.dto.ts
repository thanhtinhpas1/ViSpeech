import {IsEmail, IsEmpty, IsNotEmpty, IsString} from 'class-validator';
import {Column, Entity, Index, JoinTable, ManyToMany, OneToMany,} from 'typeorm';
import {RoleDto} from 'roles/dtos/roles.dto';
import {BaseEntityDto} from 'base/base-entity.dto';
import {OrderDto} from 'orders/dtos/orders.dto';
import {ReportDto} from '../../reports/dtos/reports.dto';

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
    constructor(firstName, lastName, username, password, email, roles: RoleDto[]) {
        super();
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
        this.email = email;
        this.roles = roles;
    }

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
    @Column()
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

    @ManyToMany(
        type => RoleDto,
        roleDto => roleDto.users,
    )
    @JoinTable({name: 'user_roles'})
    roles: RoleDto[];

    @OneToMany(
        () => ReportDto,
        reportDto => reportDto.user,
    )
    reports: ReportDto[];

    @OneToMany(
        type => OrderDto,
        orderDto => orderDto.user,
    )
    orders: OrderDto[];
}
