import { RmqModule } from '@app/common';
import { Module } from '@nestjs/common';
import { RMQ_ADMIN_SERVICE } from '../constants';
import { JogadoresController } from './jogadores.controller';

@Module({
  imports: [
    RmqModule.register({
      name: RMQ_ADMIN_SERVICE,
    }),
  ],
  controllers: [JogadoresController],
})
export class JogadoresModule {}
