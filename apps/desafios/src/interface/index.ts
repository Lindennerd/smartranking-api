import { MongooseModule } from '@nestjs/mongoose';
import { DesafioDef, desafioSchema } from './desafios.interface';
import { PartidaDef, PartidaSchema } from './partida.interface';

export * from './desafios.interface';
export * from './partida.interface';

export const mongooseModule = MongooseModule.forFeature([
  { schema: desafioSchema, name: DesafioDef.name },
  { schema: PartidaSchema, name: PartidaDef.name },
]);
