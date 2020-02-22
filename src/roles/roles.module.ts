import {Module, OnModuleInit} from '@nestjs/common';
import {InjectRepository, TypeOrmModule} from '@nestjs/typeorm';
import {RoleDto} from './dtos/roles.dto';
import {CqrsModule} from '@nestjs/cqrs';
import {EventStoreModule} from 'core/event-store/event-store.module';
import {Repository} from 'typeorm';
import {RolesService} from './services/roles.service';

// import { UserRoleDto } from "./dtos/user-roles.dto";

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
  ) { }
  async onModuleInit() {
    const customerRole = await this.repository.find({ name: "customer" });
    const adminRole = await this.repository.find({ name: "admin" });
    if (!customerRole[0] || !adminRole[0]) {
      const customerRole = new RoleDto("customer")
      const adminRole = new RoleDto("admin")
      this.repository.save(customerRole);
      this.repository.save(adminRole);
    }
  }
}


