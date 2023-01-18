//TODO! definir contratos entre o gateway e o backend

import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { JogadoresService } from './jogadores.service';

@Controller('api/v1/jogadores')
@ApiTags('Jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}

  private readonly logger = new Logger(JogadoresController.name);

  @Post()
  @UsePipes(ValidationPipe)
  async criarJogador(@Body() criarJogadorDto: CriarJogadorDto) {
    return await this.jogadoresService.criarJogador(criarJogadorDto);
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async atualizarJogador(
    @Body() atualizarJogador: AtualizarJogadorDto,
    @Param('_id') _id: string,
  ) {
    return await this.jogadoresService.atualizarJogador(atualizarJogador, _id);
  }

  @Get('/:_id')
  async consultarJogador(@Param('_id') _id: string) {
    return await this.jogadoresService.consultarJogador(_id);
  }

  @Get()
  async consultarJogadores() {
    return await this.jogadoresService.consultarJogadores();
  }

  @Delete('/:_id')
  async deletarJogador(@Param('_id') _id: string) {
    return await this.jogadoresService.removerJogador(_id);
  }

  @Post('/:_id/upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadArquivo(@Param('_id') _id: string, @UploadedFile('file') file) {
    return await this.jogadoresService.uploadImagem(_id, file);
  }
}
