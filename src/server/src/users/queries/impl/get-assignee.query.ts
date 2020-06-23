import { IsNotEmpty, IsString } from "class-validator";

export class GetAssigneeQuery {
    constructor(projectId: string,) {
        this.projectId = projectId;
    }

    @IsString()
    @IsNotEmpty()
    projectId: string;
}