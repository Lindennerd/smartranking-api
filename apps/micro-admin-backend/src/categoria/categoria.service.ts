import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Aggregate } from 'mongoose';
import { CategoriaRepository } from './categoria.repository';
import { Categoria } from './interface';

@Injectable()
export class CategoriaService {
  constructor(private readonly categoriaRepository: CategoriaRepository) {}

  private readonly logger = new Logger(CategoriaService.name);

  async criarCategoria(categoria: Categoria): Promise<Categoria> {
    try {
      return await this.categoriaRepository.create(categoria);
    } catch (err) {
      this.logger.error(err);
      throw new RpcException(err.message);
    }
  }

  async buscarCategorias(): Promise<Categoria[]> {
    //TODO! Might not be working
    return await this.categoriaRepository.find({}, {
      lookup(options) {
        options.from = 'jogadores';
        options.foreignField = '_id';
        options.as = 'jogadoresCategoria';
        options.localField = '$jogadores._id';
      },
    } as Aggregate<Categoria[]>);
  }

  async buscarCategoria(categoria: string): Promise<Categoria> {
    if (!(await this.categoriaRepository.exists({ categoria })))
      throw new RpcException('Categoria informada não existe');

    return await this.categoriaRepository.findOne({ categoria });
  }

  async buscarCategoriaJogador(idJogador: string): Promise<Categoria> {
    return await this.categoriaRepository.findOne({ jogadores: idJogador });
  }
}
