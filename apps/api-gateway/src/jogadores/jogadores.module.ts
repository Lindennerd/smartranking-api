import { RmqModule } from '@app/common';
import { Module } from '@nestjs/common';
import { AwsModule } from '../aws/aws.module';
import { AwsService } from '../aws/aws.service';
import { RMQ_ADMIN_SERVICE } from '../constants';
import { JogadoresController } from './jogadores.controller';
import { JogadoresService } from './jogadores.service';

@Module({
  imports: [
    RmqModule.register({
      name: RMQ_ADMIN_SERVICE,
    }),
    AwsModule,
  ],
  controllers: [JogadoresController],
  providers: [AwsService, JogadoresService],
  exports: [JogadoresService],
})
export class JogadoresModule {}
