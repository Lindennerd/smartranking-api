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
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, firstValueFrom } from 'rxjs';
import { AwsService } from '../aws/aws.service';
import { RMQ_ADMIN_SERVICE } from '../constants';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';

@Injectable()
export class JogadoresService {
  private readonly logger = new Logger(JogadoresService.name);

  constructor(
    @Inject(RMQ_ADMIN_SERVICE) private readonly client: ClientProxy,
    private readonly awsService: AwsService,
  ) {}

  async criarJogador(
    criarJogadorDto: CriarJogadorDto,
  ): Promise<Observable<any>> {
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

  async atualizarJogador(
    atualizarJogador: AtualizarJogadorDto,
    _id: string,
  ): Promise<Observable<any>> {
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
  async consultarJogador(_id: string) {
    return this.client.send(CONSULTAR_JOGADOR, _id);
  }

  async consultarJogadores() {
    return this.client.send(CONSULTAR_JOGADORES, '');
  }

  async removerJogador(_id: string) {
    return this.client.emit(DELETAR_JOGADOR, _id);
  }

  async uploadImagem(file: any, _id: string) {
    const jogador = await firstValueFrom(
      this.client.send(CONSULTAR_JOGADOR, _id),
    );

    if (!jogador)
      throw new BadRequestException(`Jogador com id ${_id} não encontrado!`);

    const data = await this.awsService.uploadFile(file, _id);

    this.client.emit(ATUALIZAR_JOGADOR, {
      id: _id,
      jogador: {
        urlFotoJogador: data.url,
      },
    });

    return { ...jogador, urlFotoJogador: data.url };
  }
}
