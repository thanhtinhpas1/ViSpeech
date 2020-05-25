import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CONSTANTS } from 'common/constant';
import { FindProjectQuery } from 'projects/queries/impl/find-project.query';
import { GetProjectsQuery } from 'projects/queries/impl/get-projects.query';
import { ProjectDto, ProjectIdRequestParamsDto } from '../dtos/projects.dto';
import { ProjectsService } from '../services/projects.service';
import { Roles } from 'auth/roles.decorator';
import { ProjectGuard, ProjectQueryGuard } from 'auth/guards/project.guard';
import { GetProjectsByUserIdQuery } from 'projects/queries/impl/get-projects-by-userId';
import { GetAcceptedProjectsByUserIdQuery } from 'projects/queries/impl/get-accepted-projects-by-userId';

@Controller('projects')
@ApiTags('Projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
  ) { }

  /* Create Project */

  /*--------------------------------------------*/
  @ApiOperation({ tags: ['Create Project'] })
  @ApiResponse({ status: 200, description: 'Create Project.' })
  @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT), ProjectGuard)
  @Roles([CONSTANTS.ROLE.ADMIN, CONSTANTS.ROLE.MANAGER_USER])
  @Post()
  async createProject(@Body() projectDto: ProjectDto): Promise<ProjectDto> {
    const streamId = projectDto._id;
    return this.projectsService.createProject(streamId, projectDto);
  }

  /* Update Project */

  /*--------------------------------------------*/
  @ApiOperation({ tags: ['Update Project'] })
  @ApiResponse({ status: 200, description: 'Update Project.' })
  @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT), ProjectGuard)
  @Roles([CONSTANTS.ROLE.ADMIN, CONSTANTS.ROLE.MANAGER_USER])
  @Put(':_id')
  async updateProject(
    @Param() projectIdDto: ProjectIdRequestParamsDto,
    @Body() projectDto: ProjectDto,
  ) {
    const streamId = projectIdDto._id;
    return this.projectsService.updateProject(streamId, {
      ...projectDto,
      _id: projectIdDto._id,
    });
  }

  /* Delete Project */

  /*--------------------------------------------*/
  @ApiOperation({ tags: ['Delete Project'] })
  @ApiResponse({ status: 200, description: 'Delete Project.' })
  @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT), ProjectGuard)
  @Roles([CONSTANTS.ROLE.ADMIN, CONSTANTS.ROLE.MANAGER_USER])
  @Delete(':_id')
  async deleteProject(@Param() projectIdDto: ProjectIdRequestParamsDto) {
    const streamId = projectIdDto._id;
    return this.projectsService.deleteProject(streamId, projectIdDto);
  }

  /* List Projects */

  /*--------------------------------------------*/
  @ApiOperation({ tags: ['List Projects'] })
  @ApiResponse({ status: 200, description: 'List Projects.' })
  @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT), ProjectQueryGuard)
  @Roles([CONSTANTS.ROLE.ADMIN])
  @Get()
  async getProjects(@Query() getProjectsQuery: GetProjectsQuery) {
    return this.projectsService.getProjects(getProjectsQuery);
  }

  /* List Projects By UserId */

  /*--------------------------------------------*/
  @ApiOperation({ tags: ['List Projects By UserId'] })
  @ApiResponse({ status: 200, description: 'List Projects By UserId.' })
  @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT), ProjectQueryGuard)
  @Roles([CONSTANTS.ROLE.ADMIN, CONSTANTS.ROLE.MANAGER_USER])
  @Get('/user-projects')
  async getProjectsByUserId(
    @Query() getProjectsByUserIdQuery: GetProjectsByUserIdQuery,
  ) {
    return this.projectsService.getProjectsByUserId(getProjectsByUserIdQuery);
  }

  /* List Accepted Projects By UserId */

  /*--------------------------------------------*/
  @ApiOperation({ tags: ['List Accepted Projects By UserId'] })
  @ApiResponse({ status: 200, description: 'List Accepted Projects By UserId.' })
  @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT), ProjectQueryGuard)
  @Get('/accepted-projects')
  async getAcceptedProjectsByUserId(
    @Query() getAcceptedProjectsByUserIdQuery: GetAcceptedProjectsByUserIdQuery,
  ) {
    return this.projectsService.getAcceptedProjectsByUserId(getAcceptedProjectsByUserIdQuery);
  }

  /* Find Project */

  /*--------------------------------------------*/
  @ApiOperation({ tags: ['Find Project'] })
  @ApiResponse({ status: 200, description: 'Find Project.' })
  @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT), ProjectQueryGuard)
  @Roles([CONSTANTS.ROLE.ADMIN, CONSTANTS.ROLE.MANAGER_USER])
  @Get(':id')
  async findOneProject(@Param() findProjectQuery: FindProjectQuery) {
    return this.projectsService.findOne(findProjectQuery);
  }
}
