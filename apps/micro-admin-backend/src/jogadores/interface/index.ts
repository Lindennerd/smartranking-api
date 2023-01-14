import { MongooseModule } from '@nestjs/mongoose';
import { JogadorDef, JogadorSchema } from './jogador.interface';

export * from './jogador.interface';

export const mongooseModule = MongooseModule.forFeature([
  { schema: JogadorSchema, name: JogadorDef.name },
]);
