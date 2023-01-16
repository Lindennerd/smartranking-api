import { Controller, Get } from '@nestjs/common';
import { DesafiosService } from './desafios.service';

@Controller()
export class DesafiosController {
  constructor(private readonly desafiosService: DesafiosService) {}

  @Get()
  getHello(): string {
    return this.desafiosService.getHello();
  }
}
