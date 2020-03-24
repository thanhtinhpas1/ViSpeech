import { Module, OnModuleInit } from "@nestjs/common";
import { InjectRepository, TypeOrmModule } from "@nestjs/typeorm";
import { CONSTANTS } from "common/constant";
import { Repository } from "typeorm";
import { RoleDto } from "./dtos/roles.dto";

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleDto])
  ]
})
export class RolesModule implements OnModuleInit {
  constructor(
    @InjectRepository(RoleDto)
    private readonly repository: Repository<RoleDto>,
  ) { }
  async onModuleInit() {
    this.persistRolesToDB();
  }

  async persistRolesToDB() {
    const userRole = await this.repository.find({ name: CONSTANTS.ROLE.USER });
    const manageUserRole = await this.repository.find({ name: CONSTANTS.ROLE.MANAGER_USER });
    const csrUserRole = await this.repository.find({ name: CONSTANTS.ROLE.CSR_USER });
    const adminRole = await this.repository.find({ name: CONSTANTS.ROLE.ADMIN });
    if (!userRole[0] && !csrUserRole[0] && !adminRole[0] && !manageUserRole[0]) {
      this.repository.save(new RoleDto(CONSTANTS.ROLE.USER));
      this.repository.save(new RoleDto(CONSTANTS.ROLE.MANAGER_USER));
      this.repository.save(new RoleDto(CONSTANTS.ROLE.CSR_USER));
      this.repository.save(new RoleDto(CONSTANTS.ROLE.ADMIN));
    }
  }
}