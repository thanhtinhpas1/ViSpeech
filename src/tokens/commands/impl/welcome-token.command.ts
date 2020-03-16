import { ICommand } from "@nestjs/cqrs";

export class WelcomeTokenCommand implements ICommand {
  constructor(
    public readonly streamId: string,
    public readonly tokenId: string) {}
}
