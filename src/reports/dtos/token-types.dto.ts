// import { Entity, OneToMany, Column } from "typeorm";
// import { BaseEntityDto } from "base/base-entity.dto";
// import { TokenDto } from "./reports.dto";
// import { IsNotEmpty, IsString, IsNumber, IsPositive } from "class-validator";

// @Entity("token_types")
// export class TokenTypeDto extends BaseEntityDto {
//   constructor(name) {
//     super();
//     this.name = name;
//   }

//   @IsNotEmpty()
//   @IsString()
//   @Column()
//   name: string;

//   @IsNumber()
//   @IsPositive()
//   @Column({
//     name: 'minute'
//   })
//   minute: number;

//   @OneToMany(
//     type => TokenDto,
//     tokenDto => tokenDto.tokenType
//   )
//   tokens: TokenDto[];
// }
