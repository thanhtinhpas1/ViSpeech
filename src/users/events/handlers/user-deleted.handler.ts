import { EventsHandler, IEventHandler, EventBus } from "@nestjs/cqrs";
import {
  UserDeletedEvent,
  UserDeletedSuccessEvent,
  UserDeletedFailedEvent
} from "../impl/user-deleted.event";
import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDto } from "users/dtos/users.dto";
import { Repository, getMongoRepository } from "typeorm";
import { CONSTANTS } from "common/constant";

@EventsHandler(UserDeletedEvent)
export class UserDeletedHandler implements IEventHandler<UserDeletedEvent> {
  constructor(
    @InjectRepository(UserDto)
    private readonly repository: Repository<UserDto>,
    private readonly eventBus: EventBus
  ) {}

  async handle(event: UserDeletedEvent) {
    Logger.log(event, "UserDeletedEvent");
    const { transactionId, updatedBy, roleNames, userId } = event;

    try {
      if (roleNames && !roleNames.includes(CONSTANTS.ROLE.ADMIN)) {
        const user = await this.repository.findOne({ _id: userId });
        if (user.assignerId && user.assignerId !== updatedBy) {
          // TODO: kafka throw unauthorize
          const error = { message: "unauthorize" };
          this.eventBus.publish(
            new UserDeletedFailedEvent(
              transactionId,
              updatedBy,
              roleNames,
              userId,
              error
            )
          );
          return null;
        }
      }

      if (userId) {
        await this.repository.delete({ _id: userId });
      } else {
        await getMongoRepository(UserDto).deleteOne({
          transactionId: transactionId
        });
      }
      this.eventBus.publish(
        new UserDeletedSuccessEvent(transactionId, updatedBy, roleNames, userId)
      );
    } catch (error) {
      this.eventBus.publish(
        new UserDeletedFailedEvent(
          transactionId,
          updatedBy,
          roleNames,
          userId,
          error
        )
      );
    }
  }
}

@EventsHandler(UserDeletedSuccessEvent)
export class UserDeletedSuccessHandler
  implements IEventHandler<UserDeletedSuccessEvent> {
  handle(event: UserDeletedSuccessEvent) {
    // Logger.log(event, "UserDeletedSuccessEvent");
  }
}

@EventsHandler(UserDeletedFailedEvent)
export class UserDeletedFailedHandler
  implements IEventHandler<UserDeletedFailedEvent> {
  handle(event: UserDeletedFailedEvent) {
    // Logger.log(event, "UserDeletedFailedEvent");
  }
}
