import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Jogador } from 'apps/micro-admin-backend/dist/interface';
import * as mongoose from 'mongoose';
import { Partida } from '../interface/partida.interface';

export enum DesafioStatus {
  REALIZADO = 'REALIZADO',
  PENDENTE = 'PENDENTE',
  NEGADO = 'NEGADO',
}

@Schema({ timestamps: true, collection: 'desafios' })
export class DesafioDef extends AbstractDocument {
  @Prop()
  dataHoraDesafio: Date;

  @Prop({ default: new Date() })
  dataHoraSolicitacao?: Date;

  @Prop()
  dataHoraResposta?: Date;

  @Prop({ options: DesafioStatus, default: DesafioStatus.PENDENTE })
  status?: string;

  @Prop({ required: true })
  categoria: string;

  @Prop([{ type: mongoose.Types.ObjectId, ref: 'jogadores' }])
  jogadores: Jogador[];

  @Prop({ type: mongoose.Types.ObjectId, ref: 'jogadores' })
  solicitante: Jogador;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'partidas' })
  partida?: Partida;
}

export type Desafio = DesafioDef & mongoose.Document;

export const desafioSchema = SchemaFactory.createForClass(DesafioDef);
