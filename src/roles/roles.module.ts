import { Module, OnModuleInit } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoleDto } from "./dtos/roles.dto";
import { getMongoRepository } from "typeorm";
import { CONSTANTS } from "common/constant";

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleDto])
  ]
})
export class RolesModule implements OnModuleInit {
  async onModuleInit() {
    this.persistRolesToDB();
  }

  async persistRolesToDB() {
    const userRole = await getMongoRepository(RoleDto).find({ name: CONSTANTS.ROLE.USER });
    const manageUserRole = await getMongoRepository(RoleDto).find({ name: CONSTANTS.ROLE.MANAGER_USER });
    const csrUserRole = await getMongoRepository(RoleDto).find({ name: CONSTANTS.ROLE.CSR_USER });
    const adminRole = await getMongoRepository(RoleDto).find({ name: CONSTANTS.ROLE.ADMIN });
    if (!userRole[0] && !csrUserRole[0] && !adminRole[0] && !manageUserRole[0]) {
      getMongoRepository(RoleDto).insert(new RoleDto(CONSTANTS.ROLE.USER));
      getMongoRepository(RoleDto).insert(new RoleDto(CONSTANTS.ROLE.MANAGER_USER));
      getMongoRepository(RoleDto).insert(new RoleDto(CONSTANTS.ROLE.CSR_USER));
      getMongoRepository(RoleDto).insert(new RoleDto(CONSTANTS.ROLE.ADMIN));
    }
  }
}
