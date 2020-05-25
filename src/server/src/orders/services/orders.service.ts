import {Injectable} from '@nestjs/common';
import {CommandBus, QueryBus} from '@nestjs/cqrs';
import {OrderDto, OrderIdRequestParamsDto, PaymentIntent} from '../dtos/orders.dto';
import {CreateOrderCommand} from '../commands/impl/create-order.command';
import {UpdateOrderCommand} from '../commands/impl/update-order.command';
import {DeleteOrderCommand} from '../commands/impl/delete-order.command';
import {GetOrdersQuery} from 'orders/queries/impl/get-orders.query';
import {FindOrderQuery} from 'orders/queries/impl/find-order.query';
import {config} from '../../../config';
import {GetOrdersByUserIdQuery} from 'orders/queries/impl/get-orders-by-userId';
import { FindOrderByTokenIdQuery } from 'orders/queries/impl/find-order-by-tokenId.query';

const stripe = require('stripe')(config.STRIPE_SECRET_KEY);

@Injectable()
export class OrdersService {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ) {
    }

    async createOrder(streamId: string, orderDto: OrderDto, paymentIntent: PaymentIntent) {
        return await this.commandBus.execute(new CreateOrderCommand(streamId, orderDto, paymentIntent));
    }

    async updateOrder(streamId: string, orderDto: OrderDto) {
        return await this.commandBus.execute(new UpdateOrderCommand(streamId, orderDto));
    }

    async deleteOrder(streamId: string, orderIdDto: OrderIdRequestParamsDto) {
        return await this.commandBus.execute(new DeleteOrderCommand(streamId, orderIdDto));
    }

    async getOrders(getOrdersQuery: GetOrdersQuery) {
        var query = new GetOrdersQuery();
        Object.assign(query, getOrdersQuery);
        return await this.queryBus.execute(query);
    }

    async getOrdersByUserId(getOrdersByUserIdQuery: GetOrdersByUserIdQuery) {
        var query = new GetOrdersByUserIdQuery(getOrdersByUserIdQuery.userId);
        Object.assign(query, getOrdersByUserIdQuery);
        return await this.queryBus.execute(query);
    }

    async findOne(findOrderQuery: FindOrderQuery): Promise<OrderDto> {
        var query = new FindOrderQuery(findOrderQuery.id);
        return await this.queryBus.execute(query);
    }

    async findOneByTokenId(findOrderByTokenIdQuery: FindOrderByTokenIdQuery): Promise<OrderDto> {
        var query = new FindOrderByTokenIdQuery(findOrderByTokenIdQuery.tokenId);
        return await this.queryBus.execute(query);
    }

    async getPaymentIntent(amount: string) {
        return await stripe.paymentIntents.create({
            amount: parseInt(amount),
            currency: 'usd'
        });
    }
}
