import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DesafioService } from './desafio.service';
import { AtribuirPartidaDto } from './dto/atribuir-partida.dto';
import { CreateDesafioDto } from './dto/create-desafio.dto';
import { UpdateDesafioDto } from './dto/update-desafio.dto';

@Controller('api/v1/desafios')
@ApiTags('Desafios')
export class DesafioController {
  constructor(private readonly desafioService: DesafioService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createDesafioDto: CreateDesafioDto) {
    return await this.desafioService.create(createDesafioDto);
  }

  @Get()
  async findAll() {
    return await this.desafioService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.desafioService.findOne(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(
    @Param('id') id: string,
    @Body() updateDesafioDto: UpdateDesafioDto,
  ) {
    return await this.desafioService.update(id, updateDesafioDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.desafioService.remove(id);
  }

  @Post(':idDesafio/partida')
  @UsePipes(ValidationPipe)
  async atribuiPartida(
    @Param('idDesafio') idDesafio: string,
    @Body() atribuirPartidaDto: AtribuirPartidaDto,
  ) {
    return await this.desafioService.atribuirPartida(
      idDesafio,
      atribuirPartidaDto,
    );
  }
}
