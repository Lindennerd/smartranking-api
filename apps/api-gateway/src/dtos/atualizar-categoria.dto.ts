import { ArrayMinSize, IsArray, IsOptional, IsString } from 'class-validator';

export class AtualizarCategoriaDto {
  @IsString()
  @IsOptional()
  descricao: string;
}
