import { CanActivate, Injectable, Logger, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { CONSTANTS } from "../../common/constant";
import { AuthService } from "../auth.service";
import { getMongoRepository } from "typeorm";
import { ReportDto } from "reports/dtos/reports.dto";
import { ProjectDto } from "projects/dtos/projects.dto";
import { TokenDto } from "tokens/dtos/tokens.dto";
import { TokenTypeDto } from "tokens/dtos/token-types.dto";
import { UserDto } from "users/dtos/users.dto";
import { UserUtils } from "../../utils/user.util";

@Injectable()
export class ReportQueryGuard implements CanActivate {
    constructor(
        private readonly authService: AuthService,
    ) {
    }

    async canActivate(context: import('@nestjs/common').ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const payload = this.authService.decode(request);
        if (!payload || !payload['id'] || !payload['roles']) {
            throw new UnauthorizedException();
        }
        if (UserUtils.isAdmin(payload)) return true;
        const { id, userId, statisticsType, timeType } = request.params;
        if (userId) {
            const user = await getMongoRepository(UserDto).findOne({ _id: userId });
            if (!user) {
                throw new NotFoundException(`User with _id ${id} does not exist.`);
            }
            if (userId === payload['id']) {
                return true;
            }
        }

        if (id && !userId && !statisticsType && !timeType) { // find report
            const report = await getMongoRepository(ReportDto).findOne({ _id: id });
            if (!report) {
                throw new NotFoundException(`Report with _id ${id} does not exist.`);
            }
            if (report.userId === payload['id']) {
                return true;
            }
        }
        if (id && statisticsType && timeType) { // get statistics by id
            if (statisticsType === CONSTANTS.STATISTICS_TYPE.PROJECT) {
                const project = await getMongoRepository(ProjectDto).findOne({ _id: id });
                if (!project) {
                    throw new NotFoundException(`Project with _id ${id} does not exist.`);
                }
                if (project.userId === payload['id']) {
                    return true;
                }
            } else if (statisticsType === CONSTANTS.STATISTICS_TYPE.TOKEN) {
                const token = await getMongoRepository(TokenDto).findOne({ _id: id });
                if (!token) {
                    throw new NotFoundException(`Token with _id ${id} does not exist.`);
                }
                if (token.userId === payload['id']) {
                    return true;
                }
            } else if (statisticsType === CONSTANTS.STATISTICS_TYPE.TOKEN_TYPE) {
                const tokenType = await getMongoRepository(TokenTypeDto).findOne({ _id: id });
                if (!tokenType) {
                    throw new NotFoundException(`Token type with _id ${id} does not exist.`);
                }
            }
        }
        if (id && userId && timeType) { // get statistics by token type id and user id
            const tokenType = await getMongoRepository(TokenTypeDto).findOne({ _id: id });
            if (!tokenType) {
                throw new NotFoundException(`Token type with _id ${id} does not exist.`);
            }
        }
        Logger.warn('User does not have permission to query reports.', 'ReportGuard');
        return false;
    }
}