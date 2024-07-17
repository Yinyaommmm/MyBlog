import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './exception/AllException';
import { from, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { format } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // 自动转换请求数据
      whitelist: true, // 移除非DTO定义的属性
    }),
  );
  await app.listen(3000);
}
bootstrap();
