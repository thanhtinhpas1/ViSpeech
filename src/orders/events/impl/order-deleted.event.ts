import { IEvent } from "@nestjs/cqrs";

export class OrderDeletedEvent implements IEvent {
  constructor(public readonly orderId: string) {}
}
