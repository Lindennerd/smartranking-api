import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsOptional } from 'class-validator';
import { CreateDesafioDto } from './create-desafio.dto';
import { DesafioStatus } from './desafio-status.enum';

export class UpdateDesafioDto extends PartialType(CreateDesafioDto) {
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dataHoraDesafio?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dataHoraResposta?: Date;

  @IsOptional()
  @IsEnum(DesafioStatus)
  status: DesafioStatus;
}
