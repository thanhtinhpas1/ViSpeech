"use strict";
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
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const config_1 = require("../config");
const app_module_1 = require("./app.module");
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        app.enableCors();
        const documentOptions = new swagger_1.DocumentBuilder()
            .setTitle(config_1.config.TITLE)
            .setDescription(config_1.config.DESCRIPTION)
            .setVersion(config_1.config.VERSION)
            .addTag(config_1.config.NAME)
            .setBasePath(config_1.config.PREFIX)
            .addBearerAuth()
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, documentOptions);
        const validationOptions = {
            transform: true,
            skipMissingProperties: true,
            validationError: { target: false },
        };
        app.useGlobalPipes(new common_1.ValidationPipe(validationOptions));
        app.setGlobalPrefix(config_1.config.PREFIX);
        swagger_1.SwaggerModule.setup(config_1.config.API_EXPLORER_PATH, app, document);
        yield app.listen(config_1.config.PORT, config_1.config.HOST);
        common_1.Logger.log(`Server listening on port ${config_1.config.PORT}`, 'Bootstrap');
    });
}
bootstrap();
//# sourceMappingURL=main.js.map