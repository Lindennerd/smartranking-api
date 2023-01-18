import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Jogador } from 'apps/micro-admin-backend/dist/interface';
import * as mongoose from 'mongoose';
import { SetDef } from './set.interface';

@Schema({ timestamps: true, collection: 'partidas' })
export class PartidaDef extends AbstractDocument {
  @Prop({ type: mongoose.Types.ObjectId, ref: 'jogadores' })
  def: Jogador;
  @Prop([{ type: SetDef }])
  resultado: SetDef[];
  @Prop([{ type: mongoose.Types.ObjectId, ref: 'jogadores' }])
  jogadores: Jogador[];
}

export type Partida = PartidaDef & mongoose.Document;
export const PartidaSchema = SchemaFactory.createForClass(PartidaDef);
