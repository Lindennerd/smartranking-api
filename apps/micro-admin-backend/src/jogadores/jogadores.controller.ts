//TODO! Filter to handle exceptions

import { RmqService } from '@app/common';
import {
  ATUALIZAR_JOGADOR,
  CONSULTAR_JOGADOR,
  CONSULTAR_JOGADORES,
  CRIAR_JOGADOR,
  DELETAR_JOGADOR,
} from '@app/common/events';
import { Injectable, Logger } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
  RpcException,
} from '@nestjs/microservices';
import { Jogador } from './interface';
import { JogadoresService } from './jogadores.service';

@Injectable()
export class JogadoresController {
  private readonly logger = new Logger(JogadoresController.name);

  constructor(
    private readonly jogadoresService: JogadoresService,
    private readonly rmqService: RmqService,
  ) {}

  @EventPattern(CRIAR_JOGADOR)
  async criarJogador(@Payload() jogador: Jogador, @Ctx() context: RmqContext) {
    try {
      this.jogadoresService.criarJogador(jogador);
      this.rmqService.ack(context);
    } catch (error) {
      if (error.message.includes('E1100')) {
        this.rmqService.ack(context);
      }
      this.logger.error(error);
      throw new RpcException(error);
    }
  }

  @EventPattern(ATUALIZAR_JOGADOR)
  async atualizaJogador(@Payload() data: any, @Ctx() context: RmqContext) {
    try {
      this.jogadoresService.atualizarJogador(data.id, data.jogador);

      this.rmqService.ack(context);
    } catch (error) {
      if (error.message.includes('E1100')) {
        this.rmqService.ack(context);
      }
      this.logger.error(error);
      throw new RpcException(error);
    }
  }

  @EventPattern(DELETAR_JOGADOR)
  async deletarJogador(@Payload() data: any, @Ctx() context: RmqContext) {
    try {
      this.jogadoresService.deletarJogador(data.id);

      this.rmqService.ack(context);
    } catch (error) {
      if (error.message.includes('E1100')) {
        this.rmqService.ack(context);
      }
      this.logger.error(error);
      throw new RpcException(error);
    }
  }

  @MessagePattern(CONSULTAR_JOGADOR)
  async consultarJogador(@Payload() data: any, @Ctx() context: RmqContext) {
    try {
      return this.jogadoresService.buscarJogador(data.id);
    } finally {
      this.rmqService.ack(context);
    }
  }

  @MessagePattern(CONSULTAR_JOGADORES)
  async consultarJogadores(@Payload() data: any, @Ctx() context: RmqContext) {
    try {
      return this.jogadoresService.buscarJogadores();
    } finally {
      this.rmqService.ack(context);
    }
  }
}
