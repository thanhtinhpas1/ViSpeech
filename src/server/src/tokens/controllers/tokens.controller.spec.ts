import {Test, TestingModule} from '@nestjs/testing';
import {TokensController} from './tokens.controller';
import {TokensService} from '../services/tokens.service';

describe('Tokens Controller', () => {
    let module: TestingModule;
    beforeAll(async () => {
        module = await Test.createTestingModule({
            controllers: [TokensController],
            providers: [TokensService],
        }).compile();
    });
    it('should be defined', () => {
        const controller: TokensController = module.get<TokensController>(TokensController);
        expect(controller).toBeDefined();
    });
});
