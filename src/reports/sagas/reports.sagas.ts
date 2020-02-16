import { Injectable, Logger } from "@nestjs/common";
import { ICommand, Saga, ofType } from "@nestjs/cqrs";
import { ReportCreatedEvent } from "../events/impl/report-created.event";
import { WelcomeReportCommand } from "../commands/impl/welcome-report.command";
import { delay, map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable()
export class ReportsSagas {
  // @Saga()
  // reportCreated = (events$: Observable<any>): Observable<ICommand> => {
  //   return events$.pipe(
  //     ofType(ReportCreatedEvent),
  //     delay(1000),
  //     map(event => {
  //       Logger.log("Inside [ReportsSagas] Saga", "ReportsSagas");
  //       const reportId = event.reportDto[0].id;
  //       return new WelcomeReportCommand(reportId);
  //     })
  //   );
  // };
}
