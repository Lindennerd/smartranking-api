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
import { Observable } from 'rxjs';
import { AtualizarCategoriaDto } from './dtos/atualizar-categoria.dto';
import { criarCategoriaDto } from './dtos/criar-categoria.dto';

@Controller('api/v1')
export class ApiGatewayController {
  private readonly logger = new Logger(ApiGatewayController.name);

  constructor(@Inject('ADMIN') private client: ClientProxy) {}

  @Post('categorias')
  @UsePipes(ValidationPipe)
  async criarCategoria(@Body() criarCategoriaDto: criarCategoriaDto) {
    this.client.emit('criar-categoria', criarCategoriaDto);
  }

  @Get('categorias')
  consultarCategoria(@Query('idCategoria') id: string): Observable<any> {
    return this.client.send('consultar-categorias', id || '');
  }

  @Put('categorias/:_id')
  @UsePipes(ValidationPipe)
  atualizarCategoria(
    @Body() atualizarCategoria: AtualizarCategoriaDto,
    @Param('_id') _id: string,
  ) {
    this.client.emit('atualizar-categoria', {
      id: _id,
      categoria: atualizarCategoria,
    });
  }
}
