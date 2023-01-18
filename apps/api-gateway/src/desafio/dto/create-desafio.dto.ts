import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty } from 'class-validator';

export class CreateDesafioDto {
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  dataHoraDesafio: Date;

  @IsNotEmpty()
  jogadorDesafiante: string;

  @IsNotEmpty()
  jogadorDesafiado: string;
}
