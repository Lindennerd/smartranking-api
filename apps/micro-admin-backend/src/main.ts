import { RmqService } from '@app/common';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AdminModule } from './admin.module';

const logger = new Logger('Admin-ms');

async function bootstrap() {
  const app = await NestFactory.create(AdminModule);
  const rmqService = app.get<RmqService>(RmqService);

  app.connectMicroservice(rmqService.getOptions('ADMIN'));
  await app.startAllMicroservices();

  logger.warn('Started!');
}
bootstrap();
