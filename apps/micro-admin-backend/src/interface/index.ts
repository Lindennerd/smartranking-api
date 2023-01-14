import { MongooseModule } from '@nestjs/mongoose';
import { CategoriaDef, categoriaSchema } from './categoria/categoria.interface';
import { JogadorDef, JogadorSchema } from './jogadores/jogador.interface';

export * from './categoria/categoria.interface';
export * from './jogadores/jogador.interface';

export const mongooseModule = MongooseModule.forFeature([
  { schema: categoriaSchema, name: CategoriaDef.name },
  { schema: JogadorSchema, name: JogadorDef.name },
]);
