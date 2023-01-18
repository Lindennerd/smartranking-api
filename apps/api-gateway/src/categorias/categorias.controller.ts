import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CategoriasService } from './categorias.service';
import { AtualizarCategoriaDto } from './dtos/atualizar-categoria.dto';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';

@Controller('api/v1/categorias')
@ApiTags('Categorias')
export class CategoriasController {
  private readonly logger = new Logger(CategoriasController.name);

  constructor(private readonly categoriasService: CategoriasService) {}

  @Post('')
  async criarCategoria(@Body() criarCategoriaDto: CriarCategoriaDto) {
    return await this.categoriasService.criarCategoria(criarCategoriaDto);
  }

  @Get('')
  @ApiParam({ name: 'idCategoria', required: false })
  async consultarCategoria(
    @Query('idCategoria') id?: string | undefined,
  ): Promise<Observable<any>> {
    return await this.categoriasService.consultarCategoria(id);
  }

  @Put('/:_id')
  async atualizarCategoria(
    @Body() atualizarCategoria: AtualizarCategoriaDto,
    @Param('_id') _id: string,
  ) {
    return await this.categoriasService.atualizarCategoria(
      atualizarCategoria,
      _id,
    );
  }
}
