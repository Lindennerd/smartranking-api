import {
  ATUALIZAR_JOGADOR,
  CONSULTAR_CATEGORIAS,
  CONSULTAR_JOGADOR,
  CONSULTAR_JOGADORES,
  CRIAR_JOGADOR,
  DELETAR_JOGADOR,
} from '@app/common/events';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Logger,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import { RMQ_ADMIN_SERVICE } from '../constants';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';

@Controller('api/v1/jogadores')
@ApiTags('Jogadores')
export class JogadoresController {
  constructor(@Inject(RMQ_ADMIN_SERVICE) private client: ClientProxy) {}

  private readonly logger = new Logger(JogadoresController.name);

  @Post()
  @UsePipes(ValidationPipe)
  async criarJogador(@Body() criarJogadorDto: CriarJogadorDto) {
    const categoria = await firstValueFrom(
      this.client.send(CONSULTAR_CATEGORIAS, criarJogadorDto.categoria),
    );

    if (!categoria) {
      throw new BadRequestException(
        `Categoria ${criarJogadorDto.categoria} não encontrada!`,
      );
    }

    return this.client.emit(CRIAR_JOGADOR, criarJogadorDto);
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async atualizarJogador(
    @Body() atualizarJogador: AtualizarJogadorDto,
    @Param('_id') _id: string,
  ) {
    const jogador = await firstValueFrom(
      this.client.send(CONSULTAR_JOGADOR, atualizarJogador.telefone),
    );

    if (!jogador) {
      throw new BadRequestException(
        `Jogador com telefone ${atualizarJogador.telefone} não encontrado!`,
      );
    }

    return this.client.emit(ATUALIZAR_JOGADOR, {
      id: _id,
      jogador: atualizarJogador,
    });
  }

  @Get('/:_id')
  async consultarJogador(@Param('_id') _id: string) {
    return this.client.send(CONSULTAR_JOGADOR, _id);
  }

  @Get()
  async consultarJogadores() {
    return this.client.send(CONSULTAR_JOGADORES, '');
  }

  @Delete('/:_id')
  async deletarJogador(@Param('_id') _id: string) {
    return this.client.emit(DELETAR_JOGADOR, _id);
  }
}
