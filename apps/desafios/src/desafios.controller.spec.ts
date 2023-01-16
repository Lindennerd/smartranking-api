import { Test, TestingModule } from '@nestjs/testing';
import { DesafiosController } from './desafios.controller';
import { DesafiosService } from './desafios.service';

describe('DesafiosController', () => {
  let desafiosController: DesafiosController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [DesafiosController],
      providers: [DesafiosService],
    }).compile();

    desafiosController = app.get<DesafiosController>(DesafiosController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(desafiosController.getHello()).toBe('Hello World!');
    });
  });
});
