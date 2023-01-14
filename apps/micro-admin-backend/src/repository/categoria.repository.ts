import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Categoria, CategoriaDef } from '../interface';

@Injectable()
export class CategoriaRepository extends AbstractRepository<Categoria> {
  protected logger = new Logger(CategoriaRepository.name);

  constructor(
    @InjectModel(CategoriaDef.name) categoriaModel: Model<Categoria>,
    @InjectConnection() connection: Connection,
  ) {
    super(categoriaModel, connection);
  }
}
