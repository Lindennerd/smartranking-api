import { NestFactory } from '@nestjs/core';
import { DesafiosModule } from './desafios.module';

async function bootstrap() {
  const app = await NestFactory.create(DesafiosModule);
  await app.listen(3000);
}
bootstrap();
