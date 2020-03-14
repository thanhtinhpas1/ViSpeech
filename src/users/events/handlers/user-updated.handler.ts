import {EventsHandler, IEventHandler} from "@nestjs/cqrs";
import {UserUpdatedEvent} from "../impl/user-updated.event";
import {Logger} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {UserDto} from "users/dtos/users.dto";
import {Repository} from "typeorm";

@EventsHandler(UserUpdatedEvent)
export class UserUpdatedHandler implements IEventHandler<UserUpdatedEvent> {
    constructor(
        @InjectRepository(UserDto) private readonly repository: Repository<UserDto>
    ) {
    }

    async handle(event: UserUpdatedEvent) {
        try {
            Logger.log(event, "UserUpdatedEvent");
            const {_id, ...userInfo} = event.userDto;
            delete userInfo.roles;
            delete userInfo.password;
            return await this.repository.update({_id}, userInfo);
        } catch (error) {
            Logger.error(error, "", "UserUpdatedEvent");
        }
    }
}
