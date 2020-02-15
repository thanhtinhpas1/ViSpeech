import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsEmpty,
} from "class-validator";

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from "typeorm";
import { RoleDto } from "roles/dtos/roles.dto";

export class UserIdRequestParamsDto {
  @IsString()
  userId: string;
}

@Entity("users")
export class UserDto {
  
  @IsEmpty()
  @PrimaryGeneratedColumn('uuid', {
    name: 'id'
  })
  userId: string;

  @IsString()
  @IsNotEmpty()
  @Column({
    name: 'first_name'
  })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @Column({
    name: 'last_name'
  })
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @Index({ unique: true })
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
    name: "firsttime_login_remaining",
    nullable: true
  })
  firstTimeLoginRemaining: boolean;

  @IsEmpty()
  @Column({
    default: true,
    nullable: true
  })
  enabled: boolean;

  @IsEmpty()
  @Column({
    name: 'roles_id',
  })
  @OneToMany(type => RoleDto, role => role.id, {
    eager: true,
  })
  roles: string

  @IsEmpty()
  @CreateDateColumn({
    name: 'created_date',
    nullable: true
  })
  created: string;

  @IsEmpty()
  @UpdateDateColumn({
    name: 'updated_date',
    nullable: true
  })
  updated: string;
}
