import { Project } from '../models/project.model';
import { ProjectDto } from 'projects/dtos/projects.dto';
export declare class ProjectRepository {
    createProject(streamId: string, projectDto: ProjectDto): Promise<Project>;
    updateProject(streamId: string, projectDto: ProjectDto): Promise<Project>;
    deleteProject(streamId: string, projectId: string): Promise<Project>;
    welcomeProject(streamId: string, projectId: string): Promise<Project>;
}
