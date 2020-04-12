import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProjectDto } from "projects/dtos/projects.dto";
import { Repository } from "typeorm";
import { GetAcceptedProjectsByUserIdQuery } from "../impl/get-accepted-projects-by-userId";
import { PermissionDto } from "permissions/dtos/permissions.dto";
import { CONSTANTS } from "common/constant";
import { UserDto } from "users/dtos/users.dto";

@QueryHandler(GetAcceptedProjectsByUserIdQuery)
export class GetAcceptedProjectsByUserIdHandler
  implements IQueryHandler<GetAcceptedProjectsByUserIdQuery> {
  constructor(
    @InjectRepository(ProjectDto)
    private readonly repository: Repository<ProjectDto>,
    @InjectRepository(PermissionDto)
    private readonly permissionDtoRepository: Repository<PermissionDto>,
    @InjectRepository(UserDto)
    private readonly userDtoRepository: Repository<UserDto>
  ) { }

  async execute(query: GetAcceptedProjectsByUserIdQuery): Promise<any> {
    Logger.log("Async GetAcceptedProjectsByUserIdQuery...", "GetAcceptedProjectsByUserIdQuery");
    const { userId, offset, limit } = query;
    let permissions = [];
    let result = [];
    try {
      if (limit != null && offset != null) {
        permissions = await this.permissionDtoRepository.find({
          skip: offset,
          take: limit,
          where: { assigneeId: userId, status: { $in: [CONSTANTS.STATUS.ACCEPTED, CONSTANTS.STATUS.REJECTED] } }
        });
      } else {
        permissions = await this.permissionDtoRepository.find({
          where: { assigneeId: userId, status: { $in: [CONSTANTS.STATUS.ACCEPTED, CONSTANTS.STATUS.REJECTED] } }
        });
      }

      for (const permission of permissions) {
        const project = await this.repository.findOne({ _id: permission.projectId });
        const user = await this.userDtoRepository.findOne({ _id: project.userId.toString() });
        result.push({ ...project, status: permission.status, ownerName: user.username });
      }

      return result;
    } catch (error) {
      Logger.error(error, "", "GetAcceptedProjectsByUserIdQuery");
    }
  }
}
