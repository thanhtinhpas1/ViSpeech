import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { FindOrderQuery } from "orders/queries/impl/find-order.query";
import { GetOrdersQuery } from "orders/queries/impl/get-orders.query";
import { OrderDto, OrderIdRequestParamsDto } from "../dtos/orders.dto";
import { OrdersService } from "../services/orders.service";
import { OrderGuard } from "auth/guards/order.guard";
import { CONSTANTS } from "common/constant";
import { AuthGuard } from "@nestjs/passport";
import { Roles } from "auth/roles.decorator";
import { GetOrdersByUserIdQuery } from "orders/queries/impl/get-orders-by-userId";

@Controller("orders")
@ApiTags("Orders")
@UseGuards(AuthGuard(CONSTANTS.AUTH_JWT), OrderGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  /*--------------------------------------------*/
  @ApiOperation({ tags: ["Create Order"] })
  @ApiResponse({ status: 200, description: "Create Order." })
  @Post()
  async createOrder(@Body() orderDto: OrderDto): Promise<OrderDto> {
    const streamId = orderDto._id;
    return this.ordersService.createOrderStart(streamId, orderDto);
  }

  /* Update Order */

  /*--------------------------------------------*/
  @ApiOperation({ tags: ["Update Order"] })
  @ApiResponse({ status: 200, description: "Update Order." })
  @Put(":_id")
  async updateOrder(
    @Param() orderIdDto: OrderIdRequestParamsDto,
    @Body() orderDto: OrderDto
  ) {
    const streamId = orderIdDto._id;
    return this.ordersService.updateOrder(streamId, {
      ...orderDto,
      _id: orderIdDto._id
    });
  }

  /* Delete Order */

  /*--------------------------------------------*/
  @ApiOperation({ tags: ["Delete Order"] })
  @ApiResponse({ status: 200, description: "Delete Order." })
  @Delete(":_id")
  async deleteOrder(@Param() orderIdDto: OrderIdRequestParamsDto) {
    const streamId = orderIdDto._id;
    return this.ordersService.deleteOrder(streamId, orderIdDto);
  }

  /* List Orders */

  /*--------------------------------------------*/
  @ApiOperation({ tags: ["List Orders"] })
  @ApiResponse({ status: 200, description: "List Orders." })
  @Roles([CONSTANTS.ROLE.ADMIN])
  @Get()
  async getOrders(@Query() getOrdersQuery: GetOrdersQuery) {
    return this.ordersService.getOrders(getOrdersQuery);
  }

  /* Find Order */

  /*--------------------------------------------*/
  @ApiOperation({ tags: ["Get Order"] })
  @ApiResponse({ status: 200, description: "Get Order." })
  @Get(":id")
  async findOneOrder(@Param() findOrderQuery: FindOrderQuery) {
    return this.ordersService.findOne(findOrderQuery);
  }

  /* List Orders By UserId */

  /*--------------------------------------------*/
  @ApiOperation({ tags: ['List Orders By UserId'] })
  @ApiResponse({ status: 200, description: 'List Orders By UserId.' })
  @Get('/userId')
  async getOrdersByUserId(
    @Query() getOrdersByUserIdQuery: GetOrdersByUserIdQuery,
  ) {
    return this.ordersService.getOrdersByUserId(getOrdersByUserIdQuery);
  }

  @ApiOperation({ tags: ["Get Payment Intent"] })
  @ApiResponse({ status: 200, description: "Get Payment Intent." })
  @Post("/payment-intent")
  async getPaymentIntent(@Body() body) {
    try {
      const paymentIntent = await this.ordersService.getPaymentIntent(body.amount);
      return { clientSecret: paymentIntent.client_secret };
    } catch (err) {
      throw err;
    }
  }
}
