import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {
  private jogadores: Jogador[] = [];

  constructor(
    @InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>,
  ) {}

  private readonly logger = new Logger(JogadoresService.name);
  async criarAtualizarJogador(criaJogadorDto: CriarJogadorDto): Promise<void> {
    const { email } = criaJogadorDto;

    // const jogadorEncontrado = await this.jogadores.find(
    //   (jogador) => jogador.email === email,
    // );

    const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();
    if (jogadorEncontrado) {
      this.atualizar(criaJogadorDto);
    } else {
      this.criar(criaJogadorDto);
    }
  }

  async consultarJogadoresPeloEmail(email: string): Promise<Jogador> {
    const jogadorEncontrado = this.jogadorModel.findOne({ email }).exec();
    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com e-mail ${email} não encontrado`);
    }
    return jogadorEncontrado;
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    return this.jogadorModel.find().exec();
  }

  private async criar(criaJogadorDto: CriarJogadorDto): Promise<Jogador> {
    // const { nome, telefoneCelular, email } = criaJogadorDto;

    const jogadorCriado = new this.jogadorModel(criaJogadorDto);
    return jogadorCriado.save();
  }

  private async atualizar(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
    return this.jogadorModel
      .findOneAndUpdate(
        { email: criarJogadorDto.email },
        { $set: criarJogadorDto },
      )
      .exec();
    // const { nome } = criarJogadorDto;

    // jogadorEncontrado.nome = nome;
  }

  async deletarJogador(email): Promise<any> {
    // const jogadorEncontrado = this.jogadores.find(
    //   (jogador) => jogador.email === email,
    // );
    // // if(!jogadorEncontrado){
    // //   throw new NotFoundException(`Jogador com e-mail ${email} não encontrado`);
    // this.jogadores = this.jogadores.filter(
    //   (jogador) => jogador.email !== jogadorEncontrado.email,
    // );
    return this.jogadorModel.deleteOne({ email }).exec();
  }
}
