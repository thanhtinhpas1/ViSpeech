import { IEventHandler, EventsHandler } from "@nestjs/cqrs";
import { UserCreatedEvent } from "../impl/user-created.event";
import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDto } from "users/dtos/users.dto";
import { Repository } from "typeorm";
import { Utils } from "utils";
import { RoleDto } from "roles/dtos/roles.dto";
import { RolesService } from "roles/services/roles.service";

@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler implements IEventHandler<UserCreatedEvent> {
  constructor(
    @InjectRepository(UserDto) private readonly repository: Repository<UserDto>,
    private readonly rolesService: RolesService
  ) {}

  async handle(event: UserCreatedEvent) {
    Logger.log(event, "UserCreatedEvent");
    const user = event.userDto[0];
    user.password = Utils.hashPassword(user.password[0]);
    const customerRole = await this.rolesService.findByName("customer");
    user.roles = [customerRole];
    return await this.repository.save(user);
  }
}
