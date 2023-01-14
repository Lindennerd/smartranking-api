import {
  ATUALIZAR_JOGADOR,
  CONSULTAR_JOGADOR,
  CONSULTAR_JOGADORES,
  CRIAR_JOGADOR,
  DELETAR_JOGADOR,
} from '@app/common/events';
import { Injectable } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { Jogador } from './interface';
import { JogadoresService } from './jogadores.service';

@Injectable()
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}

  @EventPattern(CRIAR_JOGADOR)
  async criarJogador(@Payload() jogador: Jogador, @Ctx() context: RmqContext) {
    this.jogadoresService.criarJogador(jogador);
  }

  @EventPattern(ATUALIZAR_JOGADOR)
  async atualizaJogador(@Payload() data: any, @Ctx() context: RmqContext) {
    this.jogadoresService.atualizarJogador(data.id, data.jogador);
  }

  @EventPattern(DELETAR_JOGADOR)
  async deletarJogador(@Payload() data: any, @Ctx() context: RmqContext) {
    this.jogadoresService.deletarJogador(data.id);
  }

  @MessagePattern(CONSULTAR_JOGADOR)
  async consultarJogador(@Payload() data: any, @Ctx() context: RmqContext) {
    return this.jogadoresService.buscarJogador(data.id);
  }

  @MessagePattern(CONSULTAR_JOGADORES)
  async consultarJogadores(@Payload() data: any, @Ctx() context: RmqContext) {
    return this.jogadoresService.buscarJogadores();
  }
}
