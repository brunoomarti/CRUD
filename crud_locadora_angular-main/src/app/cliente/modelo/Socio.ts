import { Cliente } from "./Cliente";
import { Dependente } from "./Dependente";

export interface Socio extends Cliente{
  cpf: string;
  endereco: string;
  telefone: string;
  dependentes: Dependente[];
}
