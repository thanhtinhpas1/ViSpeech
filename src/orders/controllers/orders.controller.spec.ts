import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from '../services/orders.service';

describe('Orders Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [OrdersService],
    }).compile();
  });
  it('should be defined', () => {
    const controller: OrdersController = module.get<OrdersController>(OrdersController);
    expect(controller).toBeDefined();
  });
});
