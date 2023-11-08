import { Titulo } from "src/app/titulos/modelo/titulo";

export interface Item {
  _id: number;
  titulo: Titulo;
  dataAquisicao: Date;
  tipo: string;
}
