import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const corsOptions: CorsOptions = {
    origin: 'http://localhost:3000', // 허용할 도메인 설정
    credentials: true, // 인증정보(쿠키 등) 허용 여부 설정
  };
  app.enableCors(corsOptions);
  app.setGlobalPrefix('api');
  await app.listen(3001);
}
bootstrap();