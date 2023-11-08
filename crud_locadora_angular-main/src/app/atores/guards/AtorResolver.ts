import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Ator} from "../modelo/ator";
import {AtoresService} from "../servicos/atores.service";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AtorResolver implements Resolve<Ator> {

  constructor(private service: AtoresService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Ator> {

    if (route.params && route.params['id']) {
      return this.service.loadbyId(route.params['id']);
    }
    return of({ _id: '', nome: ''});
  }
}
