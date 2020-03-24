import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CONSTANTS } from 'common/constant';
import { FindProjectQuery } from 'projects/queries/impl/find-project.query';
import { GetProjectsQuery } from 'projects/queries/impl/get-projects.query';
import { ProjectDto, ProjectIdRequestParamsDto } from '../dtos/projects.dto';
import { ProjectsService } from '../services/projects.service';
import { Roles } from 'auth/roles.decorator';
import { ProjectGuard } from 'auth/guards/project.guard';

@Controller('projects')
@ApiTags('Projects')
@UseGuards(AuthGuard(CONSTANTS.AUTH_JWT), ProjectGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) { }

  /*--------------------------------------------*/
  @ApiOperation({ tags: ['Create Project'] })
  @ApiResponse({ status: 200, description: 'Create Project.' })
  @Post()
  async createProject(@Body() projectDto: ProjectDto): Promise<ProjectDto> {
    const streamId = projectDto._id;
    return this.projectsService.createProject(streamId, projectDto);
  }

  /* Update Project */
  /*--------------------------------------------*/
  @ApiOperation({ tags: ['Update Project'] })
  @ApiResponse({ status: 200, description: 'Update Project.' })
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
  @Roles([CONSTANTS.ROLE.ADMIN])
  @Get()
  async getProjects(@Query() getProjectsQuery: GetProjectsQuery) {
    return this.projectsService.getProjects(getProjectsQuery);
  }

  /* Find Project */

  /*--------------------------------------------*/
  // TODO: check permission find project belong to user
  @ApiOperation({ tags: ['Find Project'] })
  @ApiResponse({ status: 200, description: 'Find Project.' })
  @Get(':id')
  async findOneProject(@Param() findProjectQuery: FindProjectQuery) {
    return this.projectsService.findOne(findProjectQuery);
  }
}
