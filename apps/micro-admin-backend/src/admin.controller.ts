import { RmqService } from '@app/common';
import {
  ATUALIZAR_CATEGORIAS,
  CONSULTAR_CATEGORIAS,
  CRIAR_CATEGORIA,
} from '@app/common/events';
import { Controller, Logger } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
  RpcException,
} from '@nestjs/microservices';
import { AdminService } from './admin.service';
import { Categoria } from './interface';

@Controller()
export class AdminController {
  constructor(
    private readonly appService: AdminService,
    private readonly rmqService: RmqService,
  ) {}

  private readonly logger = new Logger(AdminController.name);

  @EventPattern(CRIAR_CATEGORIA)
  async criarCategoria(
    @Payload() categoria: Categoria,
    @Ctx() context: RmqContext,
  ) {
    try {
      await this.appService.criarCategoria(categoria);
      this.rmqService.ack(context);
    } catch (err) {
      this.logger.error(err);
      if (err.message.includes('E1100')) {
        this.rmqService.ack(context);
      } else {
        throw new RpcException(err);
      }
    }
  }

  @MessagePattern(CONSULTAR_CATEGORIAS)
  async buscarCategorias(@Payload() id: string, @Ctx() context: RmqContext) {
    try {
      if (id) {
        return await this.appService.buscarCategoria(id);
      } else {
        return await this.appService.buscarCategorias();
      }
    } finally {
      this.rmqService.ack(context);
    }
  }

  @EventPattern(ATUALIZAR_CATEGORIAS)
  async atualizarCategorias(@Payload() data: any, @Ctx() context: RmqContext) {
    try {
      const _id = data.id;
      const categoria = data.categoria;

      await this.atualizarCategorias(_id, categoria);
      this.rmqService.ack(context);
    } catch (error) {
      if (error.message.includes('E1100')) {
        this.rmqService.ack(context);
      } else {
        throw new RpcException(error);
      }
    }
  }
}
