import {IEvent} from '@nestjs/cqrs';

export class OrderWelcomedEvent implements IEvent {
  constructor(public readonly orderId: string) {}
}
