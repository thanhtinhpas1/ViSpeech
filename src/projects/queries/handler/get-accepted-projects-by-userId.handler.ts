import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProjectDto } from "projects/dtos/projects.dto";
import { Repository } from "typeorm";
import { GetAcceptedProjectsByUserIdQuery } from "../impl/get-accepted-projects-by-userId";
import { PermissionDto } from "permissions/dtos/permissions.dto";
import { CONSTANTS } from "common/constant";

@QueryHandler(GetAcceptedProjectsByUserIdQuery)
export class GetAcceptedProjectsByUserIdHandler
  implements IQueryHandler<GetAcceptedProjectsByUserIdQuery> {
  constructor(
    @InjectRepository(ProjectDto)
    private readonly repository: Repository<ProjectDto>,
    @InjectRepository(PermissionDto)
    private readonly permissionDtoRepository: Repository<PermissionDto>
  ) { }

  async execute(query: GetAcceptedProjectsByUserIdQuery): Promise<any> {
    Logger.log("Async GetAcceptedProjectsByUserIdQuery...", "GetAcceptedProjectsByUserIdQuery");
    const { userId, offset, limit } = query;
    let permissions = [];
    let result = [];
    try {
      if (limit && offset) {
        permissions = await this.permissionDtoRepository.find({
          skip: offset,
          take: limit,
          where: { assigneeId: userId, status: { $in: [CONSTANTS.STATUS.APPROVED, CONSTANTS.STATUS.REJECTED] } }
        });
        permissions.forEach(async permission => {
          const project = await this.repository.findOne({ _id: permission.projectId });
          result.push({ ...project, status: permission.status });
        })
      } else {
        permissions = await this.permissionDtoRepository.find({
          where: { assigneeId: userId, status: { $in: [CONSTANTS.STATUS.APPROVED, CONSTANTS.STATUS.REJECTED] } }
        });
        permissions.forEach(async permission => {
          const project = await this.repository.findOne({ _id: permission.projectId });
          result.push({ ...project, status: permission.status });
        })
      }
      return result;
    } catch (error) {
      Logger.error(error, "", "GetAcceptedProjectsByUserIdQuery");
    }
  }
}
