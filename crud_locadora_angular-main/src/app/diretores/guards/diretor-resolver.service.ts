import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Diretor} from "../modelo/diretor";
import {DiretoresService} from "../servicos/diretores.service";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DiretorResolver implements Resolve<Diretor> {

  constructor(private service: DiretoresService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Diretor> {

    if (route.params && route.params['id']) {
      return this.service.loadbyId(route.params['id']);
    }
    return of({ _id: 0, nome: ''});
  }
}
