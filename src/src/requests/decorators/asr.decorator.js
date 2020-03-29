"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = require("@nestjs/swagger");
exports.ApiFile = (fileName = 'voice') => (target, propertyKey, descriptor) => {
    swagger_1.ApiBody({
        schema: {
            type: 'object',
            properties: {
                [fileName]: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })(target, propertyKey, descriptor);
};
//# sourceMappingURL=asr.decorator.js.map