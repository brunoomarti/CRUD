import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Cliente } from "../modelo/Cliente";
import { ClienteService } from "../servicos/cliente.service";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClienteResolver implements Resolve<Cliente> {

  constructor(private service: ClienteService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Cliente> {

    if (route.params && route.params['id']) {
      return this.service.loadbyId(route.params['id']);
    }
    return of({ _id: 0, nome: '', telefone: '', sexo: '', cpf: '', dataNasc: new Date(), rua: '', numero: 0, bairro: '', cidade: '', estado: ''});
  }
}
