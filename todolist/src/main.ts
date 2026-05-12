import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


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
