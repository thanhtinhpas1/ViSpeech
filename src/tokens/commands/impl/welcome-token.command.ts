import { ICommand } from "@nestjs/cqrs";

export class WelcomeTokenCommand implements ICommand {
  constructor(public readonly tokenId: string) {}
}
