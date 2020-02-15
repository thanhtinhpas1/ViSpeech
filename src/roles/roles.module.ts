import { Module, OnModuleInit } from "@nestjs/common";
import { Entity, Column, OneToOne } from "typeorm";
import { BaseDto } from "base/base.dto";
import { IsString } from "class-validator";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoleDto } from "./dtos/roles.dto";
import { CqrsModule } from "@nestjs/cqrs";
import { EventStoreModule } from "core/event-store/event-store.module";



@Module({
    imports: [
        TypeOrmModule.forFeature([RoleDto]),
        CqrsModule,
        EventStoreModule.forFeature()
    ],
    providers: [],
    exports: [],
})
export class RolesModule implements OnModuleInit {
    
    constructor (
    ) {}

    onModuleInit() {
    }

}

