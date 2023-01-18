import { Logger, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleFactoryOptions } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

const logger = new Logger('DatabaseModule');

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        mongoose.set('debug', configService.get<boolean>('DEBUG'));

        logger.debug(
          ` Connecting to ${configService.get<string>('MONGODB_URI')}`,
        );

        return {
          uri: configService.get<string>('MONGODB_URI'),
        } as MongooseModuleFactoryOptions;
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
