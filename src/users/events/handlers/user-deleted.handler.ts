import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { UserDeletedEvent } from "../impl/user-deleted.event";
import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDto } from "users/dtos/users.dto";
import { Repository, getMongoRepository } from "typeorm";
import { CONSTANTS } from "common/constant";

@EventsHandler(UserDeletedEvent)
export class UserDeletedHandler implements IEventHandler<UserDeletedEvent> {
  constructor(
    @InjectRepository(UserDto) private readonly repository: Repository<UserDto>
  ) { }

  async handle(event: UserDeletedEvent) {
    Logger.log(event, "UserDeletedEvent");
    const userId = event.userId;
    const updatedBy = event.updatedBy;
    const roles = event.roles;
    if (!roles.includes(CONSTANTS.ROLE.ADMIN)) {
      const user = await this.repository.findOne({ _id: userId });
      if (user.assignerId && user.assignerId !== updatedBy) {
        // TODO: kafka throw unauthorize
        return null;
      }
    }

    try {
      if (userId) {
        await this.repository.delete({ _id: userId });
        return;
      }
      await getMongoRepository(UserDto).deleteOne({
        _id: userId
      });
    } catch (error) {
      Logger.error(error, "", "UserDeletedEvent");
    }
  }
}
