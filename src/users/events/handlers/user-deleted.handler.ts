import { IEventHandler, EventsHandler } from "@nestjs/cqrs";
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
  handle(event: UserDeletedEvent) {
    Logger.log(event, "UserDeletedEvent");
    const userId = event.userId[0];
    this.repository.delete(userId);
  }
}
