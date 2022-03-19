import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { HTTP_SERVER_GRAPHQL_PATH, HTTP_SERVER_PORT } from '@egvv/shared';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(HTTP_SERVER_GRAPHQL_PATH);

  await app.listen(HTTP_SERVER_PORT);

  Logger.log(`Application is running on: http://localhost:${HTTP_SERVER_PORT}`);
}

bootstrap();
