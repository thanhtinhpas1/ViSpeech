import { Injectable } from '@nestjs/common';
import { Project } from '../models/project.model';
import { ProjectDto } from 'projects/dtos/projects.dto';

@Injectable()
export class ProjectRepository {
    async createProject(streamId: string, projectDto: ProjectDto) {
        const project = new Project(streamId);
        project.setData(projectDto);
        project.createProject(streamId);
        return project;
    }

    async updateProject(streamId: string, projectDto: ProjectDto) {
        const project = new Project(streamId);
        project.setData(projectDto);
        project.updateProject(streamId);
        return project;
    }

    async deleteProject(streamId: string, projectId: string) {
        const project = new Project(projectId);
        project.deleteProject(streamId);
        return project;
    }

    async deleteProjectByUserId(streamId: string, userId: string) {
        const project = new Project(streamId);
        project.deleteProjectByUserId(streamId, userId);
        return project;
    }

    async welcomeProject(streamId: string, projectId: string) {
        const project = new Project(projectId);
        project.welcomeProject(streamId);
        return project;
    }
}
