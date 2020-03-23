import { IEvent } from "@nestjs/cqrs";

export class ProjectWelcomedEvent implements IEvent {
  constructor(
    public readonly streamId: string,
    public readonly projectId: string) { }
}
