import {IsNotEmpty, IsString, IsUUID} from 'class-validator';

export class FindUserQuery {
    constructor(id: string) {
        this.id = id;
    }

    @IsNotEmpty()
    @IsUUID()
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
