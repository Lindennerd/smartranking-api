import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'jogadores' })
export class JogadorDef {
  @Prop({ required: true, unique: true })
  telefone: string;
  @Prop({ required: true, unique: true })
  email: string;
  @Prop()
  nome: string;
  @Prop()
  ranking: string;
  @Prop()
  posicaoRanking: number;
  @Prop()
  urlFotoJogador: string;
}

export type Jogador = JogadorDef & Document;
export const JogadorSchema = SchemaFactory.createForClass(JogadorDef);
