import { RmqModule, RmqService } from '@app/common';
import { Module } from '@nestjs/common';
import { AwsModule } from '../aws/aws.module';
import { CategoriasModule } from '../categorias/categorias.module';
import { CategoriasService } from '../categorias/categorias.service';
import { RMQ_ADMIN_SERVICE, RMQ_DESAFIO_SERVICE } from '../constants';
import { JogadoresModule } from '../jogadores/jogadores.module';
import { JogadoresService } from '../jogadores/jogadores.service';
import { DesafioController } from './desafio.controller';
import { DesafioService } from './desafio.service';
@Module({
  imports: [
    CategoriasModule,
    JogadoresModule,
    AwsModule,
    RmqModule.register({
      name: RMQ_DESAFIO_SERVICE,
    }),
    RmqModule.register({
      name: RMQ_ADMIN_SERVICE,
    }),
  ],
  controllers: [DesafioController],
  providers: [DesafioService, JogadoresService, CategoriasService, RmqService],
})
export class DesafioModule {}
