import { DatabaseModule, RmqModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { mongooseModule } from './interface';

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
    RmqModule,
    DatabaseModule,
    mongooseModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
