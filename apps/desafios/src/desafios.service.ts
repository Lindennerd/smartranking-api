import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { DesafiosRepository } from './desafios.repository';
import { DesafioStatus } from './interface';
import { PartidasRepository } from './partida.repository';

@Injectable()
export class DesafiosService {
  private logger = new Logger(DesafiosService.name);

  constructor(
    private readonly desafiosRepository: DesafiosRepository,
    private readonly partidasRepository: PartidasRepository,
  ) {}

  async create(data: any): Promise<any> {
    try {
      this.logger.debug(data);
      return await this.desafiosRepository.create(data);
    } catch (err) {
      this.logger.error(err);
      throw new RpcException(err.message);
    }
  }

  async findAll(): Promise<any> {
    return await this.desafiosRepository.find({});
  }

  async findOne(id: string): Promise<any> {
    await this.desafioExiste(id);
    return await this.desafiosRepository.findOne({ id });
  }

  async update(id: string, data: any): Promise<any> {
    await this.desafioExiste(id);
    return await this.desafiosRepository.findOneAndUpdate({ id }, data);
  }

  async delete(id: string): Promise<any> {
    await this.desafioExiste(id);
    return await this.desafiosRepository.remove({ id });
  }

  async atribuirPartida(idDesafio: string, partida: any) {
    await this.desafioExiste(idDesafio);
    const partidaCriada = await this.partidasRepository.create(partida);
    await this.desafiosRepository.findOneAndUpdate(
      { id: idDesafio },
      {
        $set: {
          status: 'REALIZADO',
          partida: partidaCriada._id,
        },
      },
    );

    return partidaCriada;
  }

  async consultarDesafiosJogador(id: string) {
    if (!id || id === '') throw new RpcException('Id do jogador não informado');

    return await this.desafiosRepository.find({
      $and: [{ jogadores: { _id: id } }, { status: DesafioStatus.PENDENTE }],
    });
  }

  private async desafioExiste(id: string) {
    if (!(await this.desafiosRepository.exists({ _id: id })))
      throw new RpcException('Desafio informado não existe');
  }
}
