import { AggregateRoot } from "@nestjs/cqrs";
import { TokenCreatedEvent } from "../events/impl/token-created.event";
import { TokenUpdatedEvent } from "../events/impl/token-updated.event";
import { TokenDeletedEvent } from "../events/impl/token-deleted.event";
import { TokenWelcomedEvent } from "../events/impl/token-welcomed.event";
import { UserDto } from "users/dtos/users.dto";

export class Token extends AggregateRoot {
    [x: string]: any;

    constructor(private readonly id: string | undefined) {
        super();
    }

  setData(data, userDto: UserDto = null) {
    this.data = data;
    this.userDto = userDto;
  }

  createToken() {
    this.apply(new TokenCreatedEvent(this.data, this.userDto));
  }

    updateToken() {
        this.apply(new TokenUpdatedEvent(this.data));
    }

    welcomeToken() {
        this.apply(new TokenWelcomedEvent(this.id));
    }

    deleteToken() {
        this.apply(new TokenDeletedEvent(this.id));
    }
}
