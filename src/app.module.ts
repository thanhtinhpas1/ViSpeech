import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "auth/auth.module";
import { OrdersModule } from "orders/orders.module";
import { join } from "path";
import { ReportsModule } from "reports/reports.module";
import { RolesModule } from "roles/roles.module";
import { TokensModule } from "tokens/tokens.module";
import { UsersModule } from "users/users.module";
import { config } from "../config";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...config.DATABASE,
      useUnifiedTopology: true,
      entities: [__dirname + "/../**/*.dto{.ts,.js}"],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", config.ROOT_PATH)
    }),
    /** ------------- */
    UsersModule,
    AuthModule,
    TokensModule,
    OrdersModule,
    RolesModule,
    ReportsModule,
  ],
})
export class AppModule {

}
