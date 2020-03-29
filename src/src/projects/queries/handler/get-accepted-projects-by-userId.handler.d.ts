import { IQueryHandler } from "@nestjs/cqrs";
import { ProjectDto } from "projects/dtos/projects.dto";
import { Repository } from "typeorm";
import { GetAcceptedProjectsByUserIdQuery } from "../impl/get-accepted-projects-by-userId";
import { PermissionDto } from "permissions/dtos/permissions.dto";
export declare class GetAcceptedProjectsByUserIdHandler implements IQueryHandler<GetAcceptedProjectsByUserIdQuery> {
    private readonly repository;
    private readonly permissionDtoRepository;
    constructor(repository: Repository<ProjectDto>, permissionDtoRepository: Repository<PermissionDto>);
    execute(query: GetAcceptedProjectsByUserIdQuery): Promise<any>;
}
