import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProjectDto } from "projects/dtos/projects.dto";
import { Repository, getMongoRepository } from "typeorm";
import { GetAcceptedProjectsByUserIdQuery } from "../impl/get-accepted-projects-by-userId";
import { PermissionDto } from "permissions/dtos/permissions.dto";
import { UserDto } from "users/dtos/users.dto";
import { Utils } from "utils";

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
    const { userId, offset, limit, filters, sort } = query;
    let permissions = [];
    let result = [];
    try {
      const findOptions = {
        where: { assigneeId: userId },
        order: {}
      }
      if (filters) {
        if (filters['name']) {
          const projects = await this.repository.find({ where: { name: new RegExp(filters['name'], 'i') } });
          if (projects.length > 0) {
            const projectIds = projects.map(project => project._id)
            findOptions.where['projectId'] = { $in: [...projectIds] }
          }
        }
        if (filters['ownerName']) {
          const users = await this.userDtoRepository.find({ where: { username: new RegExp(filters['ownerName'], 'i') } });
          if (users.length > 0) {
            const userIds = users.map(user => user._id)
            findOptions.where['assignerId'] = { $in: [...userIds] }
          }
        }
        if (filters['status']) {
          findOptions.where['status'] = filters['status']
        }
      }
      if (sort) {
        const sortField = Utils.getCorrectSortField(sort.field)
        findOptions.order[sortField] = sort.order
      }

      permissions = await this.permissionDtoRepository.find({ skip: offset || 0, take: limit || 0, ...findOptions });

      for (const permission of permissions) {
        const project = await this.repository.findOne({ _id: permission.projectId });
        const user = await this.userDtoRepository.findOne({ _id: project.userId.toString() });
        result.push({ ...project, status: permission.status, ownerName: user.username });
      }

      const count = await getMongoRepository(PermissionDto).count(findOptions.where)
      return { data: result, count };
    } catch (error) {
      Logger.error(error, "", "GetAcceptedProjectsByUserIdQuery");
    }
  }
}
