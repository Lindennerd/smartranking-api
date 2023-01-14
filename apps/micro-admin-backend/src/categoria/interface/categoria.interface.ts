import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Jogador } from '../../jogadores/interface/jogador.interface';

@Schema()
export class EventoDef {
  @Prop()
  nome: string;
  @Prop()
  operacao: string;
  @Prop()
  valor: string;
}
export type Evento = EventoDef & mongoose.Document;

@Schema({ timestamps: true, collection: 'categorias' })
export class CategoriaDef extends AbstractDocument {
  @Prop({ unique: true })
  categoria: string;
  @Prop()
  descricao: string;
  @Prop([{ type: EventoDef }])
  eventos: Evento[];
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'jogadores' }] })
  jogadores: Jogador[];
}

export type Categoria = CategoriaDef & mongoose.Document;

export const categoriaSchema = SchemaFactory.createForClass(CategoriaDef);
export const eventoSchema = SchemaFactory.createForClass(EventoDef);
