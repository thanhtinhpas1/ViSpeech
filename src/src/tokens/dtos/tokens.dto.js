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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
const base_entity_dto_1 = require("base/base-entity.dto");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const constant_1 = require("common/constant");
const mongodb_1 = require("mongodb");
const typeorm_1 = require("typeorm");
class TokenIdRequestParamsDto {
    constructor(tokenId) {
        this._id = tokenId;
    }
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], TokenIdRequestParamsDto.prototype, "_id", void 0);
exports.TokenIdRequestParamsDto = TokenIdRequestParamsDto;
let TokenDto = class TokenDto extends base_entity_dto_1.BaseEntityDto {
    constructor(value, userId, projectId, tokenType = constant_1.CONSTANTS.TOKEN_TYPE.FREE, tokenTypeId = null, orderId = null) {
        super();
        this.value = value;
        this.userId = userId;
        this.projectId = projectId;
        this.tokenTypeId = tokenTypeId;
        this.tokenType = tokenType;
        this.orderId = orderId;
    }
};
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({
        unique: true,
    }),
    __metadata("design:type", String)
], TokenDto.prototype, "value", void 0);
__decorate([
    class_validator_1.IsUUID(),
    typeorm_1.Column({
        nullable: false,
        type: 'uuid',
    }),
    __metadata("design:type", typeof (_a = typeof mongodb_1.ObjectID !== "undefined" && mongodb_1.ObjectID) === "function" ? _a : Object)
], TokenDto.prototype, "userId", void 0);
__decorate([
    class_validator_1.IsString(),
    typeorm_1.Column({
        nullable: false,
    }),
    __metadata("design:type", String)
], TokenDto.prototype, "projectId", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_transformer_1.Type(() => Number),
    class_validator_1.IsNumber(),
    class_validator_1.IsPositive(),
    typeorm_1.Column({
        default: 0,
        type: 'double'
    }),
    __metadata("design:type", Number)
], TokenDto.prototype, "minutes", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_transformer_1.Type(() => Number),
    class_validator_1.IsNumber(),
    class_validator_1.IsPositive(),
    typeorm_1.Column({
        default: 0,
        nullable: false,
        type: 'double'
    }),
    __metadata("design:type", Number)
], TokenDto.prototype, "usedMinutes", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsUUID(),
    typeorm_1.Column({
        nullable: false,
        type: 'uuid',
    }),
    __metadata("design:type", typeof (_b = typeof mongodb_1.ObjectID !== "undefined" && mongodb_1.ObjectID) === "function" ? _b : Object)
], TokenDto.prototype, "tokenTypeId", void 0);
__decorate([
    class_validator_1.IsEmpty(),
    typeorm_1.Column({
        default: true,
    }),
    __metadata("design:type", Boolean)
], TokenDto.prototype, "isValid", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsIn([
        constant_1.CONSTANTS.TOKEN_TYPE.FREE,
        constant_1.CONSTANTS.TOKEN_TYPE['50-MINS'],
        constant_1.CONSTANTS.TOKEN_TYPE['200-MINS'],
        constant_1.CONSTANTS.TOKEN_TYPE['500-MINS'],
    ]),
    __metadata("design:type", String)
], TokenDto.prototype, "tokenType", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsUUID(),
    __metadata("design:type", typeof (_c = typeof mongodb_1.ObjectID !== "undefined" && mongodb_1.ObjectID) === "function" ? _c : Object)
], TokenDto.prototype, "orderId", void 0);
TokenDto = __decorate([
    typeorm_1.Entity('tokens'),
    __metadata("design:paramtypes", [String, Object, Object, String, Object, Object])
], TokenDto);
exports.TokenDto = TokenDto;
//# sourceMappingURL=tokens.dto.js.map