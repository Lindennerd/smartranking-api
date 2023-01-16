import { IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class AtualizarJogadorDto {
  @IsPhoneNumber('BR', {
    message: 'O valor de telefone deve ser um telefone válido',
  })
  @IsOptional()
  readonly telefone: string;

  @IsString()
  @IsOptional()
  readonly nome: string;

  @IsString()
  @IsOptional()
  readonly urlFotoJogador: string;
}
