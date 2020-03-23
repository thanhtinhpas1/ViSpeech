import { Injectable } from "@nestjs/common";

@Injectable()
export class ProjectsSagas {
  // @Saga()
  // projectCreated = (events$: Observable<any>): Observable<ICommand> => {
  //   return events$.pipe(
  //     ofType(ProjectCreatedEvent),
  //     map(event => {
  //       Logger.log("Inside [ProjectsSagas] Saga", "ProjectsSagas");
  //       const projectId = event.projectDto[0].id;
  //       return new WelcomeProjectCommand(projectId);
  //     })
  //   );
  // };
}
