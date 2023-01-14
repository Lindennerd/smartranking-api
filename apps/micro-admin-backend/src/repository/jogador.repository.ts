import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Jogador, JogadorDef } from '../interface';

@Injectable()
export class JogadorRepository extends AbstractRepository<Jogador> {
  protected logger = new Logger(JogadorDef.name);

  constructor(
    @InjectModel(JogadorDef.name) categoriaModel: Model<Jogador>,
    @InjectConnection() connection: Connection,
  ) {
    super(categoriaModel, connection);
  }
}
