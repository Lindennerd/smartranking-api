import { DatabaseModule, RmqModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { DesafiosController } from './desafios.controller';
import { DesafiosRepository } from './desafios.repository';
import { DesafiosService } from './desafios.service';
import { mongooseModule } from './interface';
import { PartidasRepository } from './partida.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        MONGODB_URI: Joi.string().required(),
        RABBIT_MQ_DESAFIOS_QUEUE: Joi.string().required(),
      }),
      envFilePath: 'apps/desafios/.env',
    }),
    DatabaseModule,
    RmqModule,
    mongooseModule,
  ],
  controllers: [DesafiosController],
  providers: [DesafiosService, DesafiosRepository, PartidasRepository],
})
export class DesafiosModule {}
