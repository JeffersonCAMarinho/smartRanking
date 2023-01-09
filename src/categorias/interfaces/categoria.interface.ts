import { Jogador } from "src/jogadores/interfaces/jogador.interface";
import {Document} from "mongoose";

export interface Categoria extends Document {
    readonly categoria:string;
    descricao: string;
    eventos:Array<Evento>;
    jogadores:Array<Jogador>;
}

export interface Evento {
    name: string;
    operacao: string;
    valor: number;
}

