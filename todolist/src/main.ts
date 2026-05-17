import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

import { Logger} from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './common/logger/winston.config';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(winstonConfig),
  });

  // 所有错误统一输出：statusCode / error / message / timestamp / path
  // 前端只处理一种格式
  app.useGlobalFilters(new AllExceptionsFilter());


  // 全局使用验证管道 ValidationPipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 自动剥离 DTO 中未定义的属性
      forbidNonWhitelisted:true,
      transform:true,   //把请求体的 plain object 自动转成 DTO class 实例。
    })
  )
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
