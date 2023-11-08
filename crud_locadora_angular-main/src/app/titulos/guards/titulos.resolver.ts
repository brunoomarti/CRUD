import { Resolve } from '@angular/router';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Titulo } from "../modelo/titulo";
import { TitulosService } from "../services/titulos.service";
import { Observable, of } from "rxjs";
import { Ator } from 'src/app/atores/modelo/ator';
import { Diretor } from 'src/app/diretores/modelo/diretor';
import { Classe } from 'src/app/classes/modelo/classe';

@Injectable({
  providedIn: 'root'
})

export class TitulosResolver implements Resolve<Titulo> {

  constructor(private service: TitulosService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Titulo> {

    if (route.params && route.params['id']) {
      return this.service.loadbyId(route.params['id']);
    }

    const atoresVazios: Ator[] = [];

    const diretorVazio: Diretor = {
      _id: 0,
      nome: ''
    };

    const classeVazia: Classe = {
      _id: 0,
      nome: '',
      prazoDias: 0,
      valor: 0
    };

    const tituloVazio: Titulo = {
      _id: 0,
      nome: '',
      atores: atoresVazios,
      diretor: diretorVazio,
      ano: 0,
      sinopse: '',
      categoria: '',
      classe: classeVazia
    };

    return of(tituloVazio);
  }
}
