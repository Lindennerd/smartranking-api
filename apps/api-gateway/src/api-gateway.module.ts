import { RmqModule } from '@app/common';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { ApiGatewayController } from './api-gateway.controller';
import { HttpLoggerMiddleware } from './middlewares/http-logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        RABBIT_MQ_URI: Joi.string().required(),
      }),
      envFilePath: './apps/api-gateway/.env',
    }),
    RmqModule.register({
      name: 'ADMIN',
    }),
  ],
  controllers: [ApiGatewayController],
  providers: [],
})
export class ApiGatewayModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
