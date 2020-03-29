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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const users_dto_1 = require("users/dtos/users.dto");
const get_users_query_1 = require("../impl/get-users.query");
const utils_1 = require("utils");
let GetUsersHandler = class GetUsersHandler {
    constructor(repository) {
        this.repository = repository;
    }
    execute(query) {
        return __awaiter(this, void 0, void 0, function* () {
            common_1.Logger.log("Async GetUsersQuery...", "GetUsersQuery");
            const { limit, offset } = query;
            let users = [];
            try {
                users = limit && offset ?
                    yield this.repository.find({ skip: offset, take: limit }) :
                    yield this.repository.find();
                users = utils_1.Utils.removeObjPropertiesFromObjArr(users, ['password']);
                return users;
            }
            catch (error) {
                common_1.Logger.error(error, '', 'GetUsersQuery');
            }
        });
    }
};
GetUsersHandler = __decorate([
    cqrs_1.QueryHandler(get_users_query_1.GetUsersQuery),
    __param(0, typeorm_1.InjectRepository(users_dto_1.UserDto)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], GetUsersHandler);
exports.GetUsersHandler = GetUsersHandler;
//# sourceMappingURL=get-users.handler.js.map