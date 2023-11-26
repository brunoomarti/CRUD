import {Injectable} from '@angular/core';
import {Classe} from "../modelo/classe";
import {HttpClient} from "@angular/common/http";
import {first, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  private readonly API = 'api/classe';

  constructor(private httpClient: HttpClient) {

  }

  listar() {
    return this.httpClient.get<Classe[]>(this.API)
      .pipe(
        first(),
        tap(classes => console.log()))

  }

  save(record: Classe) {
    console.log(record);
    if (record._id != 0) {

      return this.update(record);
    }
    return this.create(record);
  }

  loadbyId(id: number) {
    return this.httpClient.get<Classe>(`${this.API}/${id}`);
  }

  private create(record: Classe) {
    return this.httpClient.post<Classe>(this.API, record);
  }

  private update(record: Classe) {
    return this.httpClient.put<Classe>(`${this.API}/${record._id}`, record);
  }

  remove(id: number) {
    return this.httpClient.delete(`${this.API}/${id}`);
  }
}
