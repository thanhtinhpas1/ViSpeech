import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Delete,
  Put,
  Query
} from "@nestjs/common";
import { ApiTags, ApiResponse, ApiOperation } from "@nestjs/swagger";
import { OrderIdRequestParamsDto } from "../dtos/orders.dto";
import { OrderDto } from "../dtos/orders.dto";
import { OrdersService } from "../services/orders.service";
import { GetOrdersQuery } from 'orders/queries/impl/get-orders.query';
import { FindOrderQuery } from 'orders/queries/impl/find-order.query';

@Controller("orders")
@ApiTags("Orders")
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  /* Create Order */
  /*--------------------------------------------*/
  @ApiOperation({ tags: ["Create Order"] })
  @ApiResponse({ status: 200, description: "Create Order." })
  @Post()
  async createOrder(@Body() orderDto: OrderDto): Promise<OrderDto> {
    return this.ordersService.createOrder(orderDto);
  }

  /* Update Order */
  /*--------------------------------------------*/
  @ApiOperation({ tags: ["Update Order"] })
  @ApiResponse({ status: 200, description: "Update Order." })
  @Put(":orderId")
  async updateOrder(
    @Param() orderIdDto: OrderIdRequestParamsDto,
    @Body() orderDto: OrderDto
  ) {
    return this.ordersService.updateOrder({
      id: orderIdDto.id,
      ...orderDto
    });
  }

  /* Delete Order */
  /*--------------------------------------------*/
  @ApiOperation({ tags: ["Delete Order"] })
  @ApiResponse({ status: 200, description: "Delete Order." })
  @Delete(":orderId")
  async deleteOrder(@Param() orderIdDto: OrderIdRequestParamsDto) {
    return this.ordersService.deleteOrder(orderIdDto);
  }

  /* List Orders */
  /*--------------------------------------------*/
  @ApiOperation({ tags: ['List Orders'] })
  @ApiResponse({ status: 200, description: 'List Orders.' })
  @Get()
  async findOrders(@Query() getOrdersQuery: GetOrdersQuery) {
    return this.ordersService.findOrders(getOrdersQuery);
  }

  /* Find Order */
  /*--------------------------------------------*/
  @ApiOperation({ tags: ['Get Order'] })
  @ApiResponse({ status: 200, description: 'Get Order.' })
  @Get(':_id')
  async findOneOrder(@Param() findOrderQuery: FindOrderQuery) {
    return this.ordersService.findOne(findOrderQuery);
  }
}
