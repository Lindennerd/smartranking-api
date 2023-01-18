import {
  ATUALIZAR_CATEGORIAS,
  CONSULTAR_CATEGORIAS,
  CONSULTAR_CATEGORIAS_JOGADOR,
  CRIAR_CATEGORIA,
} from '@app/common/events';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { RMQ_ADMIN_SERVICE } from '../constants';
import { AtualizarCategoriaDto } from './dtos/atualizar-categoria.dto';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';

@Injectable()
export class CategoriasService {
  constructor(
    @Inject(RMQ_ADMIN_SERVICE) private readonly client: ClientProxy,
  ) {}

  private readonly logger = new Logger(CategoriasService.name);

  async criarCategoria(criarCategoriaDto: CriarCategoriaDto) {
    this.client.emit(CRIAR_CATEGORIA, criarCategoriaDto);
  }

  async consultarCategoria(id: string): Promise<Observable<any>> {
    return this.client.send(CONSULTAR_CATEGORIAS, id || '');
  }

  async atualizarCategoria(
    atualizarCategoria: AtualizarCategoriaDto,
    _id: string,
  ) {
    this.client.emit(ATUALIZAR_CATEGORIAS, {
      id: _id,
      categoria: atualizarCategoria,
    });
  }

  async buscarCategoriaJogador(id: string): Promise<Observable<any>> {
    return this.client.send(CONSULTAR_CATEGORIAS_JOGADOR, id);
  }
}
