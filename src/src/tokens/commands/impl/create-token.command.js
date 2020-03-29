"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CreateTokenCommand {
    constructor(streamId, tokenDto) {
        this.streamId = streamId;
        this.tokenDto = tokenDto;
    }
}
exports.CreateTokenCommand = CreateTokenCommand;
class CreateFreeTokenCommand {
    constructor(streamId, tokenDto) {
        this.streamId = streamId;
        this.tokenDto = tokenDto;
    }
}
exports.CreateFreeTokenCommand = CreateFreeTokenCommand;
class CreateOrderedTokenCommand {
    constructor(streamId, tokenDto) {
        this.streamId = streamId;
        this.tokenDto = tokenDto;
    }
}
exports.CreateOrderedTokenCommand = CreateOrderedTokenCommand;
//# sourceMappingURL=create-token.command.js.map