// import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
// import { InjectRepository } from '@nestjs/typeorm';
// import { OrderDto } from '../../dtos/orders.dto';
// import { Repository } from 'typeorm';
// import { Inject, Logger, NotFoundException } from '@nestjs/common';
// import { OrderUpdatedFailedEvent, OrderUpdatedSuccessEvent } from '../impl/order-updated.event';
// import { OrderStatusUpdatedEvent } from './../impl/order-status-updated.event';
// import { config } from '../../../../config';
// import { ClientKafka } from '@nestjs/microservices';
// import { CONSTANTS } from '../../../common/constant';
// import { Utils } from '../../../utils';
//
// @EventsHandler(OrderStatusUpdatedEvent)
// export class OrderStatusUpdatedHandler implements IEventHandler<OrderStatusUpdatedEvent> {
//     constructor(
//         @InjectRepository(OrderDto)
//         private readonly repository: Repository<OrderDto>,
//         private readonly eventBus: EventBus
//     ) {
//     }
//
//     async handle(event: OrderStatusUpdatedEvent) {
//         Logger.log(event.orderId, 'OrderStatusUpdatedEvent'); // write here
//         const {streamId, orderId, status} = event;
//
//         try {
//             const order = await this.repository.findOne({_id: orderId});
//             if (order) {
//                 await this.repository.save({...order, status});
//             } else {
//                 throw new NotFoundException('Order not found.');
//             }
//             this.eventBus.publish(new OrderUpdatedSuccessEvent(streamId, order));
//         } catch (error) {
//             this.eventBus.publish(new OrderUpdatedFailedEvent(streamId, null, error));
//         }
//     }
// }
//
// @EventsHandler(OrderStatusUpdatedSuccessEvent)
// export class OrderStatusUpdatedSuccessHandler
//     implements IEventHandler<OrderStatusUpdatedSuccessEvent> {
//     constructor(
//         @Inject(config.KAFKA.NAME)
//         private readonly clientKafka: ClientKafka,
//     ) {
//         this.clientKafka.connect();
//     }
//
//     handle(event: OrderStatusUpdatedSuccessEvent) {
//         // this.clientKafka.emit(CONSTANTS.TOPICS.ORDER_STATUS_UPDATED_SUCCESS_EVENT, JSON.stringify(event));
//         Logger.log(event.orderDto._id, 'OrderStatusUpdatedSuccessEvent');
//     }
// }
//
// @EventsHandler(OrderStatusUpdatedFailedEvent)
// export class OrderStatusUpdatedFailedHandler
//     implements IEventHandler<OrderStatusUpdatedFailedEvent> {
//     constructor(
//         @Inject(config.KAFKA.NAME)
//         private readonly clientKafka: ClientKafka,
//     ) {
//         this.clientKafka.connect();
//     }
//
//     handle(event: OrderStatusUpdatedFailedEvent) {
//         const errorObj = Utils.getErrorObj(event.error)
//         event['errorObj'] = errorObj
//         // this.clientKafka.emit(CONSTANTS.TOPICS.ORDER_STATUS_UPDATED_FAILED_EVENT, JSON.stringify(event));
//         Logger.log(errorObj, 'OrderStatusUpdatedFailedEvent');
//     }
// }
