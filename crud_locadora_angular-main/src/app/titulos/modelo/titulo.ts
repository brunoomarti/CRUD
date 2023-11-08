import { Ator } from "src/app/atores/modelo/ator";
import { Classe } from "src/app/classes/modelo/classe";
import { Diretor } from "src/app/diretores/modelo/diretor";

export interface Titulo {
  _id: number;
  nome: string;
  atores: Ator[];
  diretor: Diretor;
  ano: number;
  sinopse: string;
  categoria: string;
  classe: Classe;
}
