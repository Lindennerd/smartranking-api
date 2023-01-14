import { Module } from '@nestjs/common';
import { mongooseModule } from './interface';
import { JogadorRepository } from './jogador.repository';

@Module({
  imports: [mongooseModule],
  providers: [JogadorRepository],
})
export class JogadoresModule {}
