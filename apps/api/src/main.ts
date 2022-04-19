import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { API_SERVER_PORT, API_SERVER_URL } from '@egvv/shared-constants';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  await app.listen(API_SERVER_PORT);

  Logger.log(`Application is running on: ${API_SERVER_URL}`);
}

bootstrap();
