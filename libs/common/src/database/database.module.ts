import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleFactoryOptions } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        mongoose.set('debug', configService.get<boolean>('DEBUG'));

        return {
          uri: configService.get<string>('MONGODB_URI'),
        } as MongooseModuleFactoryOptions;
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
