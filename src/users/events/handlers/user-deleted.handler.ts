import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { UserDeletedEvent } from "../impl/user-deleted.event";
import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDto } from "users/dtos/users.dto";
import { Repository } from "typeorm";

@EventsHandler(UserDeletedEvent)
export class UserDeletedHandler implements IEventHandler<UserDeletedEvent> {
  constructor(
    @InjectRepository(UserDto) private readonly repository: Repository<UserDto>
  ) {}

  async handle(event: UserDeletedEvent) {
    try {
      Logger.log(event, "UserDeletedEvent");
      const userId = event.userId[0];
      return await this.repository.delete(userId);
    } catch (error) {
      Logger.error(error, "UserDeletedEvent");
    }
  }
}
