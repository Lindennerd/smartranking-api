import { tracing } from '@app/common';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { AllExceptionsFilter } from './filters/http-exception.filter';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';
import { SwaggerConfig } from './swagger';

const logger = new Logger('ApiGateway Bootstrap');

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
  const configService = app.get(ConfigService);

  const otel = await tracing(
    'ApiGateway',
    configService.get<string>('JAEGER_URL'),
  );

  otel.start();

  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(
    new TimeoutInterceptor(configService.get<number | undefined>('TIMEOUT')),
  );
  app.useGlobalPipes(new ValidationPipe());
  SwaggerConfig(app);
  await app.listen(configService.get('PORT'));

  logger.warn(`Started at ${configService.get('PORT')}`);
}
bootstrap();
