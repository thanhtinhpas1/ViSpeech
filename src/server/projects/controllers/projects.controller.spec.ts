import {Test, TestingModule} from '@nestjs/testing';
import {ProjectsController} from './projects.controller';
import {ProjectsService} from '../services/projects.service';

describe('Projects Controller', () => {
    let module: TestingModule;
    beforeAll(async () => {
        module = await Test.createTestingModule({
            controllers: [ProjectsController],
            providers: [ProjectsService],
        }).compile();
    });
    it('should be defined', () => {
        const controller: ProjectsController = module.get<ProjectsController>(ProjectsController);
        expect(controller).toBeDefined();
    });
});
