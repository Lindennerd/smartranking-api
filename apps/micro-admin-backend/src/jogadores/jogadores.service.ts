import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Jogador } from './interface';
import { JogadoresRepository } from './jogadores.repository';

@Injectable()
export class JogadoresService {
  constructor(private readonly jogadoresRepository: JogadoresRepository) {}

  private logger = new Logger(JogadoresService.name);

  async criarJogador(jogador: Jogador): Promise<Jogador> {
    return await this.jogadoresRepository.create(jogador);
  }

  async buscarJogadores(): Promise<Jogador[]> {
    return await this.jogadoresRepository.find({});
  }

  async buscarJogador(id: string): Promise<Jogador> {
    if (!(await this.jogadoresRepository.exists({ _id: id })))
      throw new RpcException('Jogador informado não existe');
    else return await this.jogadoresRepository.findOne({ _id: id });
  }

  async atualizarJogador(id: string, jogador: Jogador): Promise<void> {
    await this.jogadoresRepository.findOneAndUpdate({ _id: id }, jogador);
  }

  async deletarJogador(id: string): Promise<void> {
    await this.jogadoresRepository.remove({ _id: id });
  }
}
