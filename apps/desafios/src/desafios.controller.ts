import { RmqService } from '@app/common';
import {
  ATRIBUIR_PARTIDA,
  ATUALIZAR_DESAFIOS,
  CONSULTAR_DESAFIOS,
  CRIAR_DESAFIO,
  DELETAR_DESAFIOS,
  DESAFIOS_JOGADORES,
} from '@app/common/events/desafio.events';
import { Controller, Logger } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
  RpcException,
} from '@nestjs/microservices';
import { DesafiosService } from './desafios.service';
import { Desafio } from './interface';

@Controller()
export class DesafiosController {
  private readonly logger = new Logger(DesafiosController.name);

  constructor(
    private readonly desafiosService: DesafiosService,
    private readonly rmqService: RmqService,
  ) {}

  @EventPattern(CRIAR_DESAFIO)
  async criarDesafio(@Payload() desafio: Desafio, @Ctx() context: RmqContext) {
    try {
      await this.desafiosService.create(desafio);
      this.rmqService.ack(context);
    } catch (err) {
      this.logger.error(err);
      this.rmqService.ack(context);
      throw new RpcException(err);
    }
  }

  @MessagePattern(CONSULTAR_DESAFIOS)
  async buscarDesafios(@Payload() id: string, @Ctx() context: RmqContext) {
    try {
      if (id) {
        return await this.desafiosService.findOne(id);
      } else {
        return await this.desafiosService.findAll();
      }
    } finally {
      this.rmqService.ack(context);
    }
  }

  @EventPattern(ATUALIZAR_DESAFIOS)
  async atualizarDesafios(@Payload() data: any, @Ctx() context: RmqContext) {
    try {
      await this.desafiosService.update(data.id, data.desafio);
      this.rmqService.ack(context);
    } catch (err) {
      this.logger.error(err);
      this.rmqService.ack(context);
      throw new RpcException(err);
    }
  }

  @EventPattern(DELETAR_DESAFIOS)
  async deletarDesafios(@Payload() id: string, @Ctx() context: RmqContext) {
    try {
      await this.desafiosService.delete(id);
      this.rmqService.ack(context);
    } catch (err) {
      this.logger.error(err);
      this.rmqService.ack(context);
      throw new RpcException(err);
    }
  }

  @EventPattern(ATRIBUIR_PARTIDA)
  async atribuirPartida(@Payload() data: any, @Ctx() context: RmqContext) {
    try {
      await this.desafiosService.atribuirPartida(data.id, data.partida);
      this.rmqService.ack(context);
    } catch (err) {
      this.logger.error(err);
      this.rmqService.ack(context);
      throw new RpcException(err);
    }
  }

  @MessagePattern(DESAFIOS_JOGADORES)
  async consultarDesafiosJogador(
    @Payload() id: string,
    @Ctx() context: RmqContext,
  ) {
    try {
      return await this.desafiosService.consultarDesafiosJogador(id);
    } finally {
      this.rmqService.ack(context);
    }
  }
}
