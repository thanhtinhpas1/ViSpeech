"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
const user_model_1 = require("../models/user.model");
let UserRepository = class UserRepository {
    createUser(streamId, userDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new user_model_1.User(undefined);
            user.setData(userDto);
            user.createUser(streamId);
            return user;
        });
    }
    createUserStart(streamId, userDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new user_model_1.User(undefined);
            user.setData(userDto);
            user.createUserStart(streamId);
            return user;
        });
    }
    updateUser(streamId, userDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new user_model_1.User(undefined);
            user.setData(userDto);
            user.updateUser(streamId);
            return user;
        });
    }
    deleteUser(streamId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new user_model_1.User(userId);
            user.deleteUser(streamId);
            return user;
        });
    }
    welcomeUser(streamId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new user_model_1.User(userId);
            user.welcomeUser(streamId);
            return user;
        });
    }
    changePassword(streamId, userId, newPassword, oldPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new user_model_1.User(userId);
            user.changePassword(streamId, newPassword, oldPassword);
            return user;
        });
    }
    sendVerifyEmail(streamId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new user_model_1.User(userId);
            user.sendVerifyEmail(streamId);
            return user;
        });
    }
    verifyEmail(streamId, emailToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new user_model_1.User(undefined);
            user.setData(emailToken);
            user.verifyEmail(streamId);
            return user;
        });
    }
};
UserRepository = __decorate([
    common_1.Injectable()
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map