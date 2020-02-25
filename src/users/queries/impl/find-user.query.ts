import {IsNotEmpty, IsString} from 'class-validator';

export class FindUserQuery {
    constructor(id: string) {
        this.id = id;
    }

    @IsNotEmpty()
    @IsString()
    id: string;
}

export class FindUserByUsernameQuery {
    constructor(username: string) {
        this.username = username;
    }
    @IsNotEmpty()
    @IsString()
    username: string;
}
