import { CanActivate, Injectable, UnauthorizedException } from "@nestjs/common";
import { CONSTANTS } from "../../common/constant";
import { AuthService } from "../auth.service";

@Injectable()
export class ReportGuard implements CanActivate {
    constructor(
        private readonly authService: AuthService,
    ) {
    }

    canActivate(context: import('@nestjs/common').ExecutionContext): boolean | Promise<boolean> | import('rxjs').Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        // const id = request.params['_id'] || request.params['id'];
        // if (!id) return true;

        const payload = this.authService.decode(request);
        if (!payload || !payload['id'] || !payload['roles']) {
            throw new UnauthorizedException();
        }
        
        const isAdmin = payload['roles'].findIndex(role => role.name === CONSTANTS.ROLE.ADMIN) !== -1;
        if (isAdmin) return true;

        // const report = getMongoRepository(ReportDto).findOne({_id: id});
        // if (!report) {
        //     throw new NotFoundException(`Report with _id ${id} does not exist.`);
        // }
        // if (report['userId'] === payload['id']) {
        //     return true;
        // }

        // Logger.warn('User do not have permission to modify this report.', 'ReportGuard');
        return false;
    }
}