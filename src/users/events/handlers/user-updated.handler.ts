import {EventsHandler, IEventHandler} from '@nestjs/cqrs';
import {UserUpdatedEvent} from '../impl/user-updated.event';
import {Logger} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {UserDto} from 'users/dtos/users.dto';
import {Repository} from 'typeorm';

@EventsHandler(UserUpdatedEvent)
export class UserUpdatedHandler implements IEventHandler<UserUpdatedEvent> {
  constructor(
    @InjectRepository(UserDto) private readonly repository: Repository<UserDto>
  ) {}

  handle(event: UserUpdatedEvent) {
    Logger.log(event, "UserUpdatedEvent");
    const { id, ...userInfo} = event.userDto[0];
    this.repository.update(id, userInfo);
  }
}
