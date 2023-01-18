import { RmqService } from '@app/common';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DesafiosModule } from './desafios.module';

const logger = new Logger('Desafios-ms');

async function bootstrap() {
  const app = await NestFactory.create(DesafiosModule);
  const rmqService = app.get<RmqService>(RmqService);

  app.connectMicroservice(rmqService.getOptions('DESAFIOS'));
  await app.startAllMicroservices();

  logger.warn('Started!');
}
bootstrap();
