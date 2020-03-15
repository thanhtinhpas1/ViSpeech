import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { FindOrderQuery } from "orders/queries/impl/find-order.query";
import { GetOrdersQuery } from "orders/queries/impl/get-orders.query";
import { OrderDto, OrderIdRequestParamsDto } from "../dtos/orders.dto";
import { OrdersService } from "../services/orders.service";
import { OrderGuard } from "auth/guards/order.guard";
import { CONSTANTS } from "common/constant";
import { AuthGuard } from "@nestjs/passport";

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
    return this.ordersService.createOrderStart(orderDto);
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
    return this.ordersService.updateOrder({
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
    return this.ordersService.deleteOrder(orderIdDto);
  }

  /* List Orders */

  /*--------------------------------------------*/
  @ApiOperation({ tags: ["List Orders"] })
  @ApiResponse({ status: 200, description: "List Orders." })
  @Get()
  async findOrders(@Query() getOrdersQuery: GetOrdersQuery) {
    return this.ordersService.findOrders(getOrdersQuery);
  }

  /* Find Order */

  /*--------------------------------------------*/
  @ApiOperation({ tags: ["Get Order"] })
  @ApiResponse({ status: 200, description: "Get Order." })
  @Get(":id")
  async findOneOrder(@Param() findOrderQuery: FindOrderQuery) {
    return this.ordersService.findOne(findOrderQuery);
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
