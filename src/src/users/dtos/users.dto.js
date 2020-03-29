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
class UserIdRequestParamsDto {
    constructor(userId) {
        this._id = userId;
    }
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UserIdRequestParamsDto.prototype, "_id", void 0);
exports.UserIdRequestParamsDto = UserIdRequestParamsDto;
class ChangePasswordBody {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", Object)
], ChangePasswordBody.prototype, "oldPassword", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", Object)
], ChangePasswordBody.prototype, "newPassword", void 0);
exports.ChangePasswordBody = ChangePasswordBody;
let UserDto = class UserDto extends base_entity_dto_1.BaseEntityDto {
    constructor(firstName, lastName, username, password, email, roles) {
        super();
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
        this.email = email;
        this.roles = roles;
    }
};
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], UserDto.prototype, "firstName", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], UserDto.prototype, "lastName", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    typeorm_1.Index({ unique: true }),
    typeorm_1.Column({ nullable: false, update: false }),
    __metadata("design:type", String)
], UserDto.prototype, "username", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    typeorm_1.Column({
        select: false, nullable: false,
    }),
    __metadata("design:type", String)
], UserDto.prototype, "password", void 0);
__decorate([
    class_validator_1.IsEmail(),
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({
        unique: true, update: false,
    }),
    __metadata("design:type", String)
], UserDto.prototype, "email", void 0);
__decorate([
    class_validator_1.IsEmpty(),
    typeorm_1.Column({
        default: true,
        nullable: true,
        insert: false,
    }),
    __metadata("design:type", Boolean)
], UserDto.prototype, "firstTimeLoginRemaining", void 0);
__decorate([
    class_validator_1.IsEmpty(),
    typeorm_1.Column({
        default: true,
        nullable: false,
        insert: false,
    }),
    __metadata("design:type", Boolean)
], UserDto.prototype, "isActive", void 0);
__decorate([
    class_validator_1.IsArray(),
    class_validator_1.IsOptional(),
    typeorm_1.Column(),
    __metadata("design:type", Array)
], UserDto.prototype, "roles", void 0);
UserDto = __decorate([
    typeorm_1.Entity('users'),
    __metadata("design:paramtypes", [String, String, String, String, String, Array])
], UserDto);
exports.UserDto = UserDto;
//# sourceMappingURL=users.dto.js.map