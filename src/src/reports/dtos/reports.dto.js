"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const typeorm_1 = require("typeorm");
const base_entity_dto_1 = require("base/base-entity.dto");
class ReportIdRequestParamsDto {
    constructor(reportId) {
        this._id = reportId;
    }
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], ReportIdRequestParamsDto.prototype, "_id", void 0);
exports.ReportIdRequestParamsDto = ReportIdRequestParamsDto;
let ReportDto = class ReportDto extends base_entity_dto_1.BaseEntityDto {
};
__decorate([
    class_transformer_1.Type(() => Number),
    class_validator_1.IsNumber(),
    class_validator_1.IsPositive(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], ReportDto.prototype, "usedMinutes", void 0);
__decorate([
    class_transformer_1.Type(() => Date),
    class_validator_1.IsDate(),
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column(),
    __metadata("design:type", Date)
], ReportDto.prototype, "dateReport", void 0);
__decorate([
    class_validator_1.IsUUID(),
    typeorm_1.Column({
        nullable: false,
        type: 'uuid'
    }),
    __metadata("design:type", typeorm_1.ObjectID)
], ReportDto.prototype, "tokenId", void 0);
__decorate([
    class_validator_1.IsUUID(),
    typeorm_1.Column({
        nullable: false,
        type: 'uuid'
    }),
    __metadata("design:type", typeorm_1.ObjectID)
], ReportDto.prototype, "userId", void 0);
ReportDto = __decorate([
    typeorm_1.Entity('reports')
], ReportDto);
exports.ReportDto = ReportDto;
//# sourceMappingURL=reports.dto.js.map