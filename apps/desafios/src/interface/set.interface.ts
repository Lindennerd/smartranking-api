import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class SetDef {
  @Prop()
  set: string;
}

export type Set = SetDef & Document;
