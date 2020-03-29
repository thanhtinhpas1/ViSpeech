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
const constant_1 = require("common/constant");
const typeorm_1 = require("typeorm");
const token_types_dto_1 = require("tokens/dtos/token-types.dto");
const tokens_dto_1 = require("tokens/dtos/tokens.dto");
class OrderIdRequestParamsDto {
    constructor(orderId) {
        this._id = orderId;
    }
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], OrderIdRequestParamsDto.prototype, "_id", void 0);
exports.OrderIdRequestParamsDto = OrderIdRequestParamsDto;
let OrderDto = class OrderDto extends base_entity_dto_1.BaseEntityDto {
    constructor(userId, tokenType, token, status = constant_1.CONSTANTS.STATUS.PENDING) {
        super();
        this.userId = userId;
        this.tokenType = tokenType;
        this.token = token;
        this.status = status;
    }
};
__decorate([
    class_validator_1.IsOptional(),
    typeorm_1.Column(),
    __metadata("design:type", tokens_dto_1.TokenDto)
], OrderDto.prototype, "token", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({
        nullable: false,
    }),
    __metadata("design:type", token_types_dto_1.TokenTypeDto)
], OrderDto.prototype, "tokenType", void 0);
__decorate([
    class_validator_1.IsUUID(),
    typeorm_1.Column({
        nullable: false,
        type: 'uuid',
    }),
    __metadata("design:type", typeorm_1.ObjectID)
], OrderDto.prototype, "userId", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.IsIn([
        constant_1.CONSTANTS.STATUS.PENDING,
        constant_1.CONSTANTS.STATUS.SUCCESS,
        constant_1.CONSTANTS.STATUS.FAILURE,
    ]),
    typeorm_1.Column(),
    __metadata("design:type", String)
], OrderDto.prototype, "status", void 0);
OrderDto = __decorate([
    typeorm_1.Entity('orders'),
    __metadata("design:paramtypes", [Object, token_types_dto_1.TokenTypeDto, tokens_dto_1.TokenDto, Object])
], OrderDto);
exports.OrderDto = OrderDto;
//# sourceMappingURL=orders.dto.js.map