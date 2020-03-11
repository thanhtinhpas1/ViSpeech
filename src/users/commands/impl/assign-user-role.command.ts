import { ICommand } from "@nestjs/cqrs";

export class AssignUserRoleCommand implements ICommand {
  constructor(
    public readonly transactionId: string,
    private readonly userId: string,
    private readonly roleNames: string[],
    private readonly assignerId: string
  ) {}
}
