import { RmqModule } from '@app/common';
import { Module } from '@nestjs/common';
import { CategoriaController } from './categoria.controller';
import { CategoriaRepository } from './categoria.repository';
import { CategoriaService } from './categoria.service';
import { mongooseModule } from './interface';

@Module({
  imports: [mongooseModule, RmqModule],
  controllers: [CategoriaController],
  providers: [CategoriaRepository, CategoriaService],
})
export class CategoriaModule {}
