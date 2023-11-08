import { Classe } from './../../classes/modelo/classe';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Item } from '../modelo/item';
import { ItemsService } from '../servicos/items.service';
import { Observable, of } from 'rxjs';
import { Titulo } from 'src/app/titulos/modelo/titulo';
import { Ator } from 'src/app/atores/modelo/ator';
import { Diretor } from 'src/app/diretores/modelo/diretor';

@Injectable({
  providedIn: 'root'
})

export class ItemResolver implements Resolve<Item> {
  constructor(private service: ItemsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Item> {

    if (route.params && route.params['id']) {
      return this.service.loadbyId(route.params['id']);
    }

    const atoresVazios: Ator[] = [];

    const diretorVazio: Diretor = {
      _id: 0,
      nome: ''
    }

    const classeVazia: Classe = {
      _id: 0,
      nome: '',
      prazoDias: 0,
      valor: 0
    }

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

    const itemVazio: Item = {
      _id: 0,
      titulo: tituloVazio,
      dataAquisicao: new Date(),
      tipo: ''
    };

    return of(itemVazio);
  }
};
