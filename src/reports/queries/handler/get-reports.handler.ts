import { GetReportsQuery } from "../impl/get-reports.query";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ReportDto } from "reports/dtos/reports.dto";
import { Repository } from "typeorm";

@QueryHandler(GetReportsQuery)
export class GetReportsHandler implements IQueryHandler<GetReportsQuery> {
  constructor(
    @InjectRepository(ReportDto)
    private readonly repository: Repository<ReportDto>
  ) {}

  async execute(query: GetReportsQuery) {
    Logger.log("Async GetReportsQuery...");
    if (query.limit && query.offset)
      return this.repository.find({
        skip: Number(query.offset),
        take: Number(query.limit)
      });
    return this.repository.find();
  }
}
