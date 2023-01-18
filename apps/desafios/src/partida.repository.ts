import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Partida, PartidaDef } from './interface';

@Injectable()
export class PartidasRepository extends AbstractRepository<Partida> {
  protected logger = new Logger(PartidasRepository.name);

  constructor(
    @InjectModel(PartidaDef.name) PartidasModel: Model<Partida>,
    @InjectConnection() connection: Connection,
  ) {
    super(PartidasModel, connection);
  }
}
