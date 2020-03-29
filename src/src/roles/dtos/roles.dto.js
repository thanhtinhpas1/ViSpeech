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
const typeorm_1 = require("typeorm");
const base_entity_dto_1 = require("base/base-entity.dto");
const class_validator_1 = require("class-validator");
const constant_1 = require("common/constant");
let RoleDto = class RoleDto extends base_entity_dto_1.BaseEntityDto {
    constructor(name) {
        super();
        this.name = name;
    }
};
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    class_validator_1.IsIn([
        constant_1.CONSTANTS.ROLE.USER,
        constant_1.CONSTANTS.ROLE.MANAGER_USER,
        constant_1.CONSTANTS.ROLE.ADMIN,
    ]),
    typeorm_1.Column(),
    __metadata("design:type", String)
], RoleDto.prototype, "name", void 0);
RoleDto = __decorate([
    typeorm_1.Entity('roles'),
    __metadata("design:paramtypes", [String])
], RoleDto);
exports.RoleDto = RoleDto;
//# sourceMappingURL=roles.dto.js.map