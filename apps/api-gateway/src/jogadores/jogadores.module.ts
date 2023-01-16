import { RmqModule } from '@app/common';
import { Module } from '@nestjs/common';
import { AwsModule } from '../aws/aws.module';
import { AwsService } from '../aws/aws.service';
import { RMQ_ADMIN_SERVICE } from '../constants';
import { JogadoresController } from './jogadores.controller';

@Module({
  imports: [
    RmqModule.register({
      name: RMQ_ADMIN_SERVICE,
    }),
    AwsModule,
  ],
  controllers: [JogadoresController],
  providers: [AwsService],
})
export class JogadoresModule {}
