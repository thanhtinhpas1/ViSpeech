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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cqrs_1 = require("@nestjs/cqrs");
const permission_repository_1 = require("../../repository/permission.repository");
const common_1 = require("@nestjs/common");
const reply_permission_assign_command_1 = require("../impl/reply-permission-assign.command");
let ReplyPermissionAssignHandler = class ReplyPermissionAssignHandler {
    constructor(repository, publisher) {
        this.repository = repository;
        this.publisher = publisher;
    }
    execute(command) {
        return __awaiter(this, void 0, void 0, function* () {
            common_1.Logger.log('Async ReplyPermissionAssignHandler...', 'ReplyPermissionAssignCommand');
            const { streamId, permissionResponseDto } = command;
            const permission = this.publisher.mergeObjectContext(yield this.repository.replyPermissionAssign(streamId, permissionResponseDto));
            permission.commit();
        });
    }
};
ReplyPermissionAssignHandler = __decorate([
    cqrs_1.CommandHandler(reply_permission_assign_command_1.ReplyPermissionAssignCommand),
    __metadata("design:paramtypes", [permission_repository_1.PermissionRepository,
        cqrs_1.EventPublisher])
], ReplyPermissionAssignHandler);
exports.ReplyPermissionAssignHandler = ReplyPermissionAssignHandler;
//# sourceMappingURL=reply-permission-assign.handler.js.map