import { IsNotEmpty, IsString } from 'class-validator';

export class GetProjectAssigneesQuery {
    constructor(projectId: string,) {
        this.projectId = projectId;
    }

    @IsString()
    @IsNotEmpty()
    projectId: string;
}