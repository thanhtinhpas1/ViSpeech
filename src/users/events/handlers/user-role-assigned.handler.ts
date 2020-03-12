import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { UserRoleAssignedEvent } from "../impl/user-role-assigned.event";
import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDto } from "../../dtos/users.dto";
import { Repository } from "typeorm";
import { RoleDto } from "../../../roles/dtos/roles.dto";

@EventsHandler(UserRoleAssignedEvent)
export class UserRoleAssignedHandler implements IEventHandler {
  constructor(
    @InjectRepository(UserDto)
    private readonly userRepository: Repository<UserDto>
  ) {}

  async handle(event: UserRoleAssignedEvent) {
    Logger.log(event.transactionId, "UserRoleAssignedEvent");
    const { userId, roleNames, assignerId } = event;
    try {
      const roleDtoArr = [];
      roleNames.forEach(name => {
        const roleDto = new RoleDto(name);
        roleDtoArr.push(roleDto);
      })
      return await this.userRepository.update(userId, {
        roles: roleDtoArr,
        assignerId
      });
    } catch (e) {
      Logger.error(e, e.message, "UserRoleAssignedEvent");
    }
  }
}
