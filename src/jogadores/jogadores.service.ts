import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';

@Injectable()
export class JogadoresService {
  private jogadores: Jogador[] = [];

  constructor(
    @InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>,
  ) {}

  private readonly logger = new Logger(JogadoresService.name);
  async criarJogador(criaJogadorDto: CriarJogadorDto): Promise<Jogador> {
    const { email } = criaJogadorDto;

    const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();
    if (jogadorEncontrado) {
      throw new BadRequestException(
        `Jogador com e-mail ${email} já cadastrado`,
      );
    }
    const jogadorCriado = new this.jogadorModel(criaJogadorDto);
    return jogadorCriado.save();
  }

  // async atualizarJogador(
  //   _id: string,
  //   criaJogadorDto: CriarJogadorDto,
  // ): Promise<void> {
  //   const jogadorEncontrado = await this.jogadorModel.findOne({ _id }).exec();
  //   if (!jogadorEncontrado) {
  //     throw new NotFoundException(`Jogador com ${_id} não encontrado`);
  //   }
  //   this.jogadorModel
  //     .findOneAndUpdate({ _id: criaJogadorDto.email }, { $set: criaJogadorDto })
  //     .exec();
  // }

  async consultarJogadoresPeloId(_id: string): Promise<Jogador> {
    const jogadorEncontrado = this.jogadorModel.findOne({ _id }).exec();
    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com e-mail ${_id} não encontrado`);
    }
    return jogadorEncontrado;
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    return this.jogadorModel.find().exec();
  }

  // private async criar(criaJogadorDto: CriarJogadorDto): Promise<Jogador> {
  //   // const { nome, telefoneCelular, email } = criaJogadorDto;

  //   const jogadorCriado = new this.jogadorModel(criaJogadorDto);
  //   return jogadorCriado.save();
  // }

  async atualizarJogador(
    _id: string,
    atualizarJogadorDto: AtualizarJogadorDto,
  ): Promise<void> {
    const jogadorEncontrado = this.jogadorModel.findOne({ _id }).exec;

    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com id ${_id} não encontrado`);
    }

    this.jogadorModel
      .findOneAndUpdate({ _id }, { $set: atualizarJogadorDto })
      .exec();
  }

  async deletarJogador(email): Promise<any> {
    return this.jogadorModel.deleteOne({ email }).exec();
  }
}
