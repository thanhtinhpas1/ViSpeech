import { IEvent } from '@nestjs/cqrs';
import { UserDto } from '../../dtos/users.dto';
import { User } from 'users/models/user.model';

export class UserCreatedEvent implements IEvent {
  constructor(
    public readonly user: User) {}
}
