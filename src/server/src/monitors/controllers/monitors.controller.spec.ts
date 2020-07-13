import { Test, TestingModule } from '@nestjs/testing';
import { MonitorsController } from './monitors.controller';
import { MonitorsService } from '../services/monitors.service';

describe('Monitors Controller', () => {
    let module: TestingModule;
    beforeAll(async () => {
        module = await Test.createTestingModule({
            controllers: [ MonitorsController ],
            providers: [ MonitorsService ],
        }).compile();
    });
    it('should be defined', () => {
        const controller: MonitorsController = module.get<MonitorsController>(MonitorsController);
        expect(controller).toBeDefined();
    });
});
