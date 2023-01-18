import { ArrayMinSize, IsArray, IsNotEmpty } from 'class-validator';

export class Set {
  set: string;
}

export class AtribuirPartidaDto {
  @IsNotEmpty()
  def: string;

  @IsArray()
  @ArrayMinSize(1)
  resultado: Set[];
}
