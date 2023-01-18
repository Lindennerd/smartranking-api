import {
  ATRIBUIR_PARTIDA,
  ATUALIZAR_DESAFIOS,
  CONSULTAR_DESAFIOS,
  CRIAR_DESAFIO,
  DELETAR_DESAFIOS,
} from '@app/common/events/desafio.events';
import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Jogador } from 'apps/micro-admin-backend/dist/interface';
import { firstValueFrom } from 'rxjs';
import { CategoriasService } from '../categorias/categorias.service';
import { RMQ_DESAFIO_SERVICE } from '../constants';
import { JogadoresService } from '../jogadores/jogadores.service';
import { AtribuirPartidaDto } from './dto/atribuir-partida.dto';
import { CreateDesafioDto } from './dto/create-desafio.dto';
import { UpdateDesafioDto } from './dto/update-desafio.dto';

@Injectable()
export class DesafioService {
  constructor(
    private readonly jogadoresService: JogadoresService,
    private readonly categoriaService: CategoriasService,
    @Inject(RMQ_DESAFIO_SERVICE) private readonly client: ClientProxy,
  ) {}

  private logger = new Logger(DesafioService.name);

  async create(createDesafioDto: CreateDesafioDto) {
    console.log(typeof createDesafioDto.dataHoraDesafio);

    if (createDesafioDto.dataHoraDesafio.getTime() < new Date().getTime())
      throw new BadRequestException(
        'Não é possível marcar desafios para uma data anterior a atual',
      );

    const jogadorDesafiado = await firstValueFrom<Jogador>(
      await this.jogadoresService.consultarJogador(
        createDesafioDto.jogadorDesafiado,
      ),
    );

    const jogadorDesafiante = await firstValueFrom<Jogador>(
      await this.jogadoresService.consultarJogador(
        createDesafioDto.jogadorDesafiante,
      ),
    );

    if (jogadorDesafiante.email === jogadorDesafiado.email)
      throw new BadRequestException(
        'O jogador desafiante e o jogador desafiado não podem ser a mesma pessoa',
      );

    //TODO: Verificar se os jogadores estão em alguma categoria

    const categoriaDesafiante = await firstValueFrom(
      await this.categoriaService.buscarCategoriaJogador(
        createDesafioDto.jogadorDesafiante,
      ),
    );

    const categoriaDesafiado = await firstValueFrom(
      await this.categoriaService.buscarCategoriaJogador(
        createDesafioDto.jogadorDesafiado,
      ),
    );

    if (!categoriaDesafiado || !categoriaDesafiante)
      throw new BadRequestException(
        'Os jogadores devem estar em alguma categoria',
      );

    if (categoriaDesafiante.categoria !== categoriaDesafiado.categoria)
      throw new BadRequestException(
        'O desafiante e o desafiado devem estar na mesma categoria',
      );

    return await firstValueFrom(
      await this.client.emit(CRIAR_DESAFIO, {
        ...createDesafioDto,
        categoria: categoriaDesafiado.categoria,
      }),
    );
  }

  async findAll() {
    return await firstValueFrom(this.client.send(CONSULTAR_DESAFIOS, ''));
  }

  async findOne(id: string) {
    return await firstValueFrom(this.client.send(CONSULTAR_DESAFIOS, id));
  }

  async update(id: string, updateDesafioDto: UpdateDesafioDto) {
    this.desafioExiste(id);

    // if (
    //   updateDesafioDto.dataHoraDesafio &&
    //   updateDesafioDto.dataHoraDesafio.getTime() < new Date().getTime()
    // )
    //   throw new BadRequestException(
    //     'Não é possível marcar desafios para uma data anterior a atual',
    //   );

    return await firstValueFrom(
      this.client.emit(ATUALIZAR_DESAFIOS, {
        id: id,
        desafio: updateDesafioDto,
      }),
    );
  }

  async remove(id: string) {
    this.desafioExiste(id);
    return await firstValueFrom(this.client.emit(DELETAR_DESAFIOS, id));
  }

  async atribuirPartida(
    idDesafio: string,
    atribuirPartidaDto: AtribuirPartidaDto,
  ) {
    const desafio = await firstValueFrom(
      this.client.send(CONSULTAR_DESAFIOS, idDesafio),
    );

    if (!desafio) throw new BadRequestException('O desafio não existe');

    if (
      !desafio.jogadores.some(
        (j) => j._id.toString() === atribuirPartidaDto.def,
      )
    )
      throw new BadRequestException(
        'O usuário vencedor indicado não participou desse desafio',
      );

    return await this.client.emit(ATRIBUIR_PARTIDA, {
      id: desafio.id,
      atribuirPartidaDto,
    });
  }

  private async desafioExiste(id: string) {
    const desafio = await firstValueFrom(
      this.client.send(CONSULTAR_DESAFIOS, id),
    );
    if (!desafio) throw new BadRequestException('O desafio não existe');
  }
}
