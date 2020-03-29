"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DeleteTokenCommand {
    constructor(streamId, tokenIdDto) {
        this.streamId = streamId;
        this.tokenIdDto = tokenIdDto;
    }
}
exports.DeleteTokenCommand = DeleteTokenCommand;
class DeleteTokenByUserIdCommand {
    constructor(streamId, userId) {
        this.streamId = streamId;
        this.userId = userId;
    }
}
exports.DeleteTokenByUserIdCommand = DeleteTokenByUserIdCommand;
//# sourceMappingURL=delete-token.command.js.map