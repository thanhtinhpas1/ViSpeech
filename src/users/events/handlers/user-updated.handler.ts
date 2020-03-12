import { EventsHandler, IEventHandler, EventBus } from "@nestjs/cqrs";
import {
  UserUpdatedEvent,
  UserUpdatedFailedEvent,
  UserUpdatedSuccessEvent
} from "../impl/user-updated.event";
import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDto } from "users/dtos/users.dto";
import { Repository } from "typeorm";
import { Utils } from "utils";
import { RoleDto } from "roles/dtos/roles.dto";
import { CONSTANTS } from "common/constant";

@EventsHandler(UserUpdatedEvent)
export class UserUpdatedHandler implements IEventHandler<UserUpdatedEvent> {
  constructor(
    @InjectRepository(UserDto)
    private readonly repository: Repository<UserDto>,
    private readonly eventBus: EventBus
  ) {}

  async handle(event: UserUpdatedEvent) {
    Logger.log(event, "UserUpdatedEvent");
    const { transactionId, updatedBy, roleNames, userDto } = event;
    const { _id, ...userInfo } = userDto;

    try {
      if (updatedBy !== _id && !roleNames.includes(CONSTANTS.ROLE.ADMIN)) {
        const user = await this.repository.findOne(_id);
        if (user.assignerId && user.assignerId !== updatedBy) {
          // TODO: kafka throw unauthorize
          const error = { message: "unauthorize" };
          this.eventBus.publish(
            new UserUpdatedFailedEvent(
              transactionId,
              updatedBy,
              roleNames,
              userDto,
              error
            )
          );
          return null;
        }
      }

      const formattedRoles = Utils.formatUserRoles(userInfo.roles);
      userInfo.roles = formattedRoles.map(role => new RoleDto(role.name));
      userInfo.roles.forEach(role => delete role._id);
      await this.repository.update({ _id }, userInfo);
      this.eventBus.publish(
        new UserUpdatedSuccessEvent(
          transactionId,
          updatedBy,
          roleNames,
          userDto
        )
      );
    } catch (error) {
      this.eventBus.publish(
        new UserUpdatedFailedEvent(
          transactionId,
          updatedBy,
          roleNames,
          userDto,
          error
        )
      );
    }
  }
}

@EventsHandler(UserUpdatedSuccessEvent)
export class UserUpdatedSuccessHandler
  implements IEventHandler<UserUpdatedSuccessEvent> {
  handle(event: UserUpdatedSuccessEvent) {
    // Logger.log(event, "UserDeletedSuccessEvent");
  }
}

@EventsHandler(UserUpdatedFailedEvent)
export class UserUpdatedFailedHandler
  implements IEventHandler<UserUpdatedFailedEvent> {
  handle(event: UserUpdatedFailedEvent) {
    // Logger.log(event, "UserUpdatedFailedEvent");
  }
}
