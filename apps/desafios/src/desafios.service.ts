import { Injectable } from '@nestjs/common';

@Injectable()
export class DesafiosService {
  getHello(): string {
    return 'Hello World!';
  }
}
