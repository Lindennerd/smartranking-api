import { IsNotEmpty, IsString } from 'class-validator';

export interface Evento {
  nome: string;
  operacao: string;
  valor: string;
}

export class CriarCategoriaDto {
  @IsString()
  @IsNotEmpty()
  readonly categoria: string;

  @IsString()
  @IsNotEmpty()
  descricao: string;
}
