import { Module, OnModuleInit } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoleDto } from "./dtos/roles.dto";
import { CqrsModule } from "@nestjs/cqrs";
import { EventStoreModule } from "core/event-store/event-store.module";
// import { UserRoleDto } from "./dtos/user-roles.dto";

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleDto]),
    CqrsModule,
    EventStoreModule.forFeature()
  ],
  providers: [],
  exports: []
})
export class RolesModule implements OnModuleInit {
  constructor() {}
  onModuleInit() {}
}
