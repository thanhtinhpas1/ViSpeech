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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const jwt_1 = require("@nestjs/jwt");
const utils_1 = require("utils");
const find_user_query_1 = require("../users/queries/impl/find-user.query");
const constant_1 = require("common/constant");
let AuthService = class AuthService {
    constructor(jwtService, queryBus) {
        this.jwtService = jwtService;
        this.queryBus = queryBus;
    }
    validateUser(username, pass) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findUserByUsername(username);
            if (user && utils_1.Utils.comparePassword(user.password, pass)) {
                const { password } = user, result = __rest(user, ["password"]);
                return result;
            }
            return null;
        });
    }
    validateUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.queryBus.execute(new find_user_query_1.FindUserQuery(userId));
            return user || null;
        });
    }
    generateToken(userId, username, roles) {
        const payload = { username, id: userId, roles };
        return this.jwtService.sign(payload);
    }
    generateTokenWithUserId(userId, expiresIn = null) {
        const payload = { id: userId };
        if (expiresIn) {
            return this.jwtService.sign(payload, { expiresIn });
        }
        return this.jwtService.sign(payload);
    }
    generateEmailToken(assignerId, projectId, assigneeId, permissions) {
        const payload = { assignerId, projectId, assigneeId, permissions };
        return this.jwtService.sign(payload, { expiresIn: '2 days' });
    }
    findUserByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.queryBus.execute(new find_user_query_1.FindUserByUsernameQuery(username));
        });
    }
    decodeJwtToken(jwt) {
        return this.jwtService.decode(jwt);
    }
    decode(request) {
        const authorization = request.headers.authorization;
        if (!authorization)
            return null;
        const jwt = authorization.replace(constant_1.CONSTANTS.BEARER_HEADER_AUTHORIZE, '');
        return this.decodeJwtToken(jwt);
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        cqrs_1.QueryBus])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map