import { MongooseModule } from '@nestjs/mongoose';
import { CategoriaDef, categoriaSchema } from './categoria.interface';

export * from './categoria.interface';

export const mongooseModule = MongooseModule.forFeature([
  { schema: categoriaSchema, name: CategoriaDef.name },
]);
