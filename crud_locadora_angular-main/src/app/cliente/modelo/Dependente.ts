import { Cliente } from "./Cliente";
import { Socio } from "./Socio";

export interface Dependente extends Cliente{
  socio: Socio;
}
