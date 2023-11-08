import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Classe} from "../modelo/classe";
import {ClassesService} from "../servicos/classes.service";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClasseResolver implements Resolve<Classe> {

  constructor(private service: ClassesService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Classe> {

    if (route.params && route.params['id']) {
      return this.service.loadbyId(route.params['id']);
    }
    return of({ _id: 0, nome: '', prazoDias: 0, valor: 0});
  }
}
