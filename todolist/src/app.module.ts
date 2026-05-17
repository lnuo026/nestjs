import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { WinstonModule } from "nest-winston";


import { validationSchema } from "./config/validation";
import { winstonConfig } from "./common/logger/winston.config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TodosModule } from "./module/TodosModule";


// ConfigModule.forRoot(...) 会在应用启动时读取环境变量，并用你在 validation.ts 定义的规则校验
// isGlobal: true 让你在任意模块里都能直接注入 ConfigService，无需每个模块都写 imports: [ConfigModule]
@Module({
  imports: [
    //  负责加载和校验环境变量
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
    }),
    //  注册日志系统,让 Nest 的日志输出走 Winston。
    WinstonModule.forRoot(winstonConfig),
    TodosModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}