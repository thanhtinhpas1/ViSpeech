import { Module, OnModuleInit } from "@nestjs/common";
import { InjectRepository, TypeOrmModule } from "@nestjs/typeorm";
import { RoleDto } from "./dtos/roles.dto";
import { CqrsModule } from "@nestjs/cqrs";
import { EventStoreModule } from "core/event-store/event-store.module";
import { Repository } from "typeorm";
import { RolesService } from "./services/roles.service";
import { CONSTANTS } from "common/constant";

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleDto]),
    CqrsModule,
    EventStoreModule.forFeature()
  ],
  providers: [RolesService],
  exports: [RolesService]
})
export class RolesModule implements OnModuleInit {
  constructor(
    @InjectRepository(RoleDto)
    private readonly repository: Repository<RoleDto>
  ) {}

  async onModuleInit() {
    const userRole = await this.repository.find({ name: CONSTANTS.ROLE.USER });
    const adminRole = await this.repository.find({ name: CONSTANTS.ROLE.ADMIN });
    if (!userRole[0] || !adminRole[0]) {
      const userRole = new RoleDto(CONSTANTS.ROLE.USER);
      const adminRole = new RoleDto(CONSTANTS.ROLE.ADMIN);
      await this.repository.save(userRole);
      await this.repository.save(adminRole);
    }
  }
}
