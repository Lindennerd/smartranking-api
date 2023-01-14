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
  constructor(private readonly appService: AdminService) {}

  private readonly logger = new Logger(AdminController.name);

  @EventPattern('criar-categoria')
  async criarCategoria(
    @Payload() categoria: Categoria,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      await this.appService.criarCategoria(categoria);
      await channel.ack(originalMsg);
    } catch (err) {
      this.logger.error(err);
      if (err.message.includes('E1100')) {
        await channel.ack(originalMsg);
      } else {
        throw new RpcException(err);
      }
    }
  }

  @MessagePattern('consultar-categorias')
  async buscarCategorias(@Payload() id: string, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      if (id) {
        return await this.appService.buscarCategoria(id);
      } else {
        return await this.appService.buscarCategorias();
      }
    } finally {
      await channel.ack(originalMsg);
    }
  }

  @EventPattern('atualizar-categorias')
  async atualizarCategorias(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      const _id = data.id;
      const categoria = data.categoria;

      await this.atualizarCategorias(_id, categoria);
      await channel.ack(originalMsg);
    } catch (error) {
      if (error.message.includes('E1100')) {
        await channel.ack(originalMsg);
      } else {
        throw new RpcException(error);
      }
    }
  }
}
