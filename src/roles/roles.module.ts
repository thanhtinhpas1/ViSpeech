import { Module, OnModuleInit } from "@nestjs/common";
import { InjectRepository, TypeOrmModule } from "@nestjs/typeorm";
import { RoleDto } from "./dtos/roles.dto";
import { CqrsModule } from "@nestjs/cqrs";
import { EventStoreModule } from "core/event-store/event-store.module";
import { Repository } from "typeorm";
import { CONSTANTS } from "common/constant";

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleDto])
  ]
})
export class RolesModule implements OnModuleInit {
  constructor(
    @InjectRepository(RoleDto)
    private readonly repository: Repository<RoleDto>
  ) {}

  async onModuleInit() {
    const userRole = await this.repository.find({ name: CONSTANTS.ROLE.USER });
    const manageUserRole = await this.repository.find({ name: CONSTANTS.ROLE.MANAGER_USER });
    const adminRole = await this.repository.find({ name: CONSTANTS.ROLE.ADMIN });
    if (!userRole[0] || !adminRole[0] || !manageUserRole[0]) {
      await this.repository.save(new RoleDto(CONSTANTS.ROLE.USER));
      await this.repository.save(new RoleDto(CONSTANTS.ROLE.MANAGER_USER));
      await this.repository.save(new RoleDto(CONSTANTS.ROLE.ADMIN));
    }
  }
}
