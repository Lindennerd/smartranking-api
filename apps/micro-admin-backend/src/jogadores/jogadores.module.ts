import { RmqModule } from '@app/common';
import { Module } from '@nestjs/common';
import { mongooseModule } from './interface';
import { JogadoresController } from './jogadores.controller';
import { JogadoresRepository } from './jogadores.repository';
import { JogadoresService } from './jogadores.service';

@Module({
  imports: [mongooseModule, RmqModule],
  controllers: [JogadoresController],
  providers: [JogadoresRepository, JogadoresService],
})
export class JogadoresModule {}
