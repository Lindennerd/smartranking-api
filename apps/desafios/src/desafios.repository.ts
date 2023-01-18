import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Desafio, DesafioDef } from './interface';

@Injectable()
export class DesafiosRepository extends AbstractRepository<Desafio> {
  protected logger = new Logger(DesafiosRepository.name);

  constructor(
    @InjectModel(DesafioDef.name) desafiosModel: Model<Desafio>,
    @InjectConnection() connection: Connection,
  ) {
    super(desafiosModel, connection);
  }
}
