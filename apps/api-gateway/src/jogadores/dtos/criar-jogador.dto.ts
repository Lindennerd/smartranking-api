import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CriarJogadorDto {
  @IsPhoneNumber('BR', {
    message: 'O valor de telefone deve ser um telefone válido',
  })
  @IsNotEmpty({ message: 'O valor de telefone não pode estar vazio' })
  readonly telefone: string;

  @IsEmail()
  @IsNotEmpty({ message: 'o valor de email não pode estar vazio' })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly nome: string;

  @IsString()
  readonly categoria: string;
}
