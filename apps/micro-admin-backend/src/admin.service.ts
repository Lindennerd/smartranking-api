import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Categoria, CategoriaDef, Jogador, JogadorDef } from './interface';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(CategoriaDef.name)
    private readonly categoriaModel: Model<Categoria>,
    @InjectModel(JogadorDef.name)
    private readonly jogadoreModel: Model<Jogador>,
  ) {}

  private readonly logger = new Logger(AdminService.name);

  async criarCategoria(categoria: Categoria): Promise<Categoria> {
    try {
      const categoriaCriada = new this.categoriaModel(categoria);
      return await categoriaCriada.save();
    } catch (err) {
      this.logger.error(err);
      throw new RpcException(err.message);
    }
  }

  async buscarCategorias(): Promise<Categoria[]> {
    return await this.categoriaModel
      .find({})
      .populate({ path: 'jogadores', model: JogadorDef.name })
      .exec();
  }

  async buscarCategoria(categoria: string): Promise<Categoria> {
    if (!(await this.categoriaModel.exists({ categoria }).exec()))
      throw new RpcException('Categoria informada não existe');

    return await this.categoriaModel.findOne({ categoria }).exec();
  }
}
