import {Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {FindOrderQuery} from 'orders/queries/impl/find-order.query';
import {GetOrdersQuery} from 'orders/queries/impl/get-orders.query';
import {OrderDto, OrderIdRequestParamsDto, PaymentIntent} from '../dtos/orders.dto';
import {OrdersService} from '../services/orders.service';
import {OrderGuard, OrderQueryGuard} from 'auth/guards/order.guard';
import {CONSTANTS} from 'common/constant';
import {AuthGuard} from '@nestjs/passport';
import {Roles} from 'auth/roles.decorator';
import {GetOrdersByUserIdQuery} from 'orders/queries/impl/get-orders-by-userId';
import { FindOrderByTokenIdQuery } from 'orders/queries/impl/find-order-by-tokenId.query';

@Controller('orders')
@ApiTags('Orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {
    }

    /* Create Order */

    /*--------------------------------------------*/
    @ApiOperation({tags: ['Create Order']})
    @ApiResponse({status: 200, description: 'Create Order.'})
    @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT), OrderGuard)
    @Post()
    async createOrder(@Body("order") orderDto: OrderDto, @Body("paymentIntent") paymentIntent: PaymentIntent): Promise<OrderDto> {
        const streamId = orderDto._id;
        return this.ordersService.createOrder(streamId, orderDto, paymentIntent);
    }

    /* Create Upgrade Token Order */

    /*--------------------------------------------*/
    @ApiOperation({tags: ['Create Upgrade Token Order']})
    @ApiResponse({status: 200, description: 'Create Upgrade Token Order.'})
    @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT), OrderGuard)
    @Post('/upgrade-token')
    async createUpgradeTokenOrder(@Body("order") orderDto: OrderDto, @Body("paymentIntent") paymentIntent: PaymentIntent): Promise<OrderDto> {
        const streamId = orderDto._id;
        return this.ordersService.createUpgradeTokenOrder(streamId, orderDto, paymentIntent);
    }

    /* Update Order */

    /*--------------------------------------------*/
    @ApiOperation({tags: ['Update Order']})
    @ApiResponse({status: 200, description: 'Update Order.'})
    @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT), OrderGuard)
    @Roles([CONSTANTS.ROLE.ADMIN])
    @Put(':_id')
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
    @ApiOperation({tags: ['Delete Order']})
    @ApiResponse({status: 200, description: 'Delete Order.'})
    @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT), OrderGuard)
    @Roles([CONSTANTS.ROLE.ADMIN])
    @Delete(':_id')
    async deleteOrder(@Param() orderIdDto: OrderIdRequestParamsDto) {
        const streamId = orderIdDto._id;
        return this.ordersService.deleteOrder(streamId, orderIdDto);
    }

    /* List Orders */

    /*--------------------------------------------*/
    @ApiOperation({tags: ['List Orders']})
    @ApiResponse({status: 200, description: 'List Orders.'})
    @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT), OrderQueryGuard)
    @Roles([CONSTANTS.ROLE.ADMIN])
    @Get()
    async getOrders(@Query() getOrdersQuery: GetOrdersQuery) {
        return this.ordersService.getOrders(getOrdersQuery);
    }

    /* List Orders By UserId */

    /*--------------------------------------------*/
    @ApiOperation({tags: ['List Orders By UserId']})
    @ApiResponse({status: 200, description: 'List Orders By UserId.'})
    @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT), OrderQueryGuard)
    @Get('/userId')
    async getOrdersByUserId(
        @Query() getOrdersByUserIdQuery: GetOrdersByUserIdQuery,
    ) {
        return this.ordersService.getOrdersByUserId(getOrdersByUserIdQuery);
    }

    @ApiOperation({tags: ['Get Payment Intent']})
    @ApiResponse({status: 200, description: 'Get Payment Intent.'})
    @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT))
    @Roles([CONSTANTS.ROLE.ADMIN, CONSTANTS.ROLE.MANAGER_USER])
    @Post('/payment-intent')
    async getPaymentIntent(@Body() body) {
        try {
            const paymentIntent = await this.ordersService.getPaymentIntent(body.amount);
            return {clientSecret: paymentIntent.client_secret};
        } catch (err) {
            throw err;
        }
    }

    /* Get Order By TokenId */

    /*--------------------------------------------*/
    @ApiOperation({tags: ['Get Order By TokenId']})
    @ApiResponse({status: 200, description: 'Get Order By TokenId.'})
    @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT), OrderQueryGuard)
    @Get('/get-by-token/:tokenId')
    async findOrderByTokenId(@Param() findOrderByTokenIdQuery: FindOrderByTokenIdQuery) {
        return this.ordersService.findOneByTokenId(findOrderByTokenIdQuery);
    }

    /* Find Order */

    /*--------------------------------------------*/
    @ApiOperation({tags: ['Get Order']})
    @ApiResponse({status: 200, description: 'Get Order.'})
    @UseGuards(AuthGuard(CONSTANTS.AUTH_JWT), OrderQueryGuard)
    @Get(':id')
    async findOneOrder(@Param() findOrderQuery: FindOrderQuery) {
        return this.ordersService.findOne(findOrderQuery);
    }
}
