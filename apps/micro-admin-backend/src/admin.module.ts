import { DatabaseModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { CategoriaModule } from './categoria/categoria.module';
import { JogadoresModule } from './jogadores/jogadores.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        MONGODB_URI: Joi.string().required(),
        RABBIT_MQ_ADMIN_QUEUE: Joi.string().required(),
      }),
      envFilePath: 'apps/micro-admin-backend/.env',
    }),
    DatabaseModule,
    CategoriaModule,
    JogadoresModule,
  ],
})
export class AdminModule {}
