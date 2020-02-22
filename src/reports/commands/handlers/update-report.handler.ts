import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { UpdateReportCommand } from "../impl/update-report.command";
import { ReportRepository } from "../../repository/report.repository";
import { Logger } from "@nestjs/common";

@CommandHandler(UpdateReportCommand)
export class UpdateReportHandler
  implements ICommandHandler<UpdateReportCommand> {
  constructor(
    private readonly repository: ReportRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateReportCommand) {
    Logger.log("Async UpdateReportHandler...", "UpdateReportCommand");

    const { reportDto } = command;
    const report = this.publisher.mergeObjectContext(
      await this.repository.updateReport(reportDto)
    );
    report.commit();
  }
}
