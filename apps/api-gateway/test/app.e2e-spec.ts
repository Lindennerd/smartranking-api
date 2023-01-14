import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { ApiGatewayModule } from '../src/api-gateway.module';

describe('ApiGateway (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ApiGatewayModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('# Categorias', () => {
    it('categorias (GET)', () => {
      return request(app.getHttpServer()).get('/api/v1/categorias').expect(200);
    });

    it('categorias (POST)', () => {
      return request(app.getHttpServer())
        .post('/api/v1/categorias')
        .send({
          categoria: 'AF',
          descricao: 'Categoria AF',
          eventos: [
            { nome: 'VITORIA', operacao: '+', valor: 30 },
            { nome: 'VITORIA_LIDER', operacao: '+', valor: 50 },
            { nome: 'DERROTA', operacao: '+', valor: 0 },
          ],
        })
        .expect(201);
    });

    it('categorias (PUT)', () => {
      return request(app.getHttpServer())
        .put('/api/v1/categorias/63ba06cbbc2149f483d7e4bf')
        .send({})
        .expect(200);
    });
  });
});
