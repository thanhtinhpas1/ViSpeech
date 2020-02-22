import {Injectable} from '@nestjs/common';

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
