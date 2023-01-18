import { RmqModule, RmqService } from '@app/common';
import { Module } from '@nestjs/common';
import { RMQ_ADMIN_SERVICE } from '../constants';
import { CategoriasController } from './categorias.controller';
import { CategoriasService } from './categorias.service';

@Module({
  imports: [
    RmqModule.register({
      name: RMQ_ADMIN_SERVICE,
    }),
  ],
  controllers: [CategoriasController],
  providers: [RmqService, CategoriasService],
  exports: [CategoriasService],
})
export class CategoriasModule {}
