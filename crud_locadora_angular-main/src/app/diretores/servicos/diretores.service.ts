import {Injectable} from '@angular/core';
import {Diretor} from "../modelo/diretor";
import {HttpClient} from "@angular/common/http";
import {first, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DiretoresService {

  private readonly API = 'api/diretor';

  constructor(private httpClient: HttpClient) {
  }

  listar() {
    return this.httpClient.get<Diretor[]>(this.API)
      .pipe(
        first(),
        tap(diretores => console.log()))

  }

  save(record: Diretor) {
    console.log(record);
    if (record._id != 0) {

      return this.update(record);
    }
    return this.create(record);
  }

  loadbyId(id: number) {
    return this.httpClient.get<Diretor>(`${this.API}/${id}`);
  }

  private create(record: Diretor) {
    return this.httpClient.post<Diretor>(this.API, record);
  }

  private update(record: Diretor) {
    return this.httpClient.put<Diretor>(`${this.API}/${record._id}`, record);
  }

  remove(id: number) {
    return this.httpClient.delete(`${this.API}/${id}`);
  }
}
