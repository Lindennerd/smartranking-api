import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Categoria } from './interface';
import { CategoriaRepository } from './repository/categoria.repository';
import { JogadorRepository } from './repository/jogador.repository';

@Injectable()
export class AdminService {
  constructor(
    private readonly categoriaRepository: CategoriaRepository,
    private readonly jogadorRepository: JogadorRepository,
  ) {}

  private readonly logger = new Logger(AdminService.name);

  async criarCategoria(categoria: Categoria): Promise<Categoria> {
    try {
      return await this.categoriaRepository.create(categoria);
    } catch (err) {
      this.logger.error(err);
      throw new RpcException(err.message);
    }
  }

  async buscarCategorias(): Promise<Categoria[]> {
    return await this.categoriaRepository.find({});
  }

  async buscarCategoria(categoria: string): Promise<Categoria> {
    if (!(await this.categoriaRepository.exists({ categoria })))
      throw new RpcException('Categoria informada não existe');

    return await this.categoriaRepository.findOne({ categoria });
  }
}
