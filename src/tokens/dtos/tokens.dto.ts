import { IsString, IsEmail, IsBoolean, IsNotEmpty, IsEmpty, IsNumber, Allow } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, Unique, ObjectIdColumn } from 'typeorm';

export class TokenIdRequestParamsDto {
  @IsString()
  readonly tokenId!: string;
}

@Entity("tokens")
export class TokenDto {

  @IsEmpty()
  @PrimaryGeneratedColumn('uuid')
  tokenId!: string;

  @IsString()
  @IsNotEmpty()
  @Column({
    name: "token_key",
    length: 150,
  })
  tokenKey!: string;

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
}