import {
  ATUALIZAR_CATEGORIAS,
  CONSULTAR_CATEGORIAS,
  CRIAR_CATEGORIA,
} from '@app/common/events';
import {
  Body,
  Controller,
  Get,
  Inject,
  Logger,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { RMQ_ADMIN_SERVICE } from '../constants';
import { AtualizarCategoriaDto } from './dtos/atualizar-categoria.dto';
import { criarCategoriaDto } from './dtos/criar-categoria.dto';

@Controller('api/v1/categorias')
@ApiTags('Categorias')
export class CategoriasController {
  private readonly logger = new Logger(CategoriasController.name);

  constructor(@Inject(RMQ_ADMIN_SERVICE) private client: ClientProxy) {}

  @Post('')
  @UsePipes(ValidationPipe)
  async criarCategoria(@Body() criarCategoriaDto: criarCategoriaDto) {
    this.client.emit(CRIAR_CATEGORIA, criarCategoriaDto);
  }

  @Get('')
  consultarCategoria(@Query('idCategoria') id: string): Observable<any> {
    return this.client.send(CONSULTAR_CATEGORIAS, id || '');
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  atualizarCategoria(
    @Body() atualizarCategoria: AtualizarCategoriaDto,
    @Param('_id') _id: string,
  ) {
    this.client.emit(ATUALIZAR_CATEGORIAS, {
      id: _id,
      categoria: atualizarCategoria,
    });
  }
}
