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
const base_entity_dto_1 = require("base/base-entity.dto");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
class ProjectIdRequestParamsDto {
    constructor(projectId) {
        this._id = projectId;
    }
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], ProjectIdRequestParamsDto.prototype, "_id", void 0);
exports.ProjectIdRequestParamsDto = ProjectIdRequestParamsDto;
let ProjectDto = class ProjectDto extends base_entity_dto_1.BaseEntityDto {
    constructor(name, userId, description = '') {
        super();
        this.name = name;
        this.userId = userId;
        this.description = description;
    }
};
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({
        unique: true,
    }),
    __metadata("design:type", String)
], ProjectDto.prototype, "name", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    typeorm_1.Column({
        default: '',
    }),
    __metadata("design:type", String)
], ProjectDto.prototype, "description", void 0);
__decorate([
    class_validator_1.IsUUID(),
    typeorm_1.Column({
        nullable: false,
        type: 'uuid',
    }),
    __metadata("design:type", typeorm_1.ObjectID)
], ProjectDto.prototype, "userId", void 0);
ProjectDto = __decorate([
    typeorm_1.Entity('projects'),
    __metadata("design:paramtypes", [String, Object, String])
], ProjectDto);
exports.ProjectDto = ProjectDto;
//# sourceMappingURL=projects.dto.js.map