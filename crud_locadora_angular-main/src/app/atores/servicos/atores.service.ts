import {Injectable} from '@angular/core';
import {Ator} from "../modelo/ator";
import {HttpClient} from "@angular/common/http";
import {first, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AtoresService {

  private readonly API = 'api/ator';

  constructor(private httpClient: HttpClient) {

  }

  listar() {
    return this.httpClient.get<Ator[]>(this.API)
      .pipe(
        first(),
        tap(atores => console.log()))

  }

  save(record: Ator) {
    console.log(record);
    if (record._id) {

      return this.update(record);
    }
    return this.create(record);
  }

  loadbyId(id: number) {
    return this.httpClient.get<Ator>(`${this.API}/${id}`);
  }

  private create(record: Ator) {
    return this.httpClient.post<Ator>(this.API, record);
  }

  private update(record: Ator) {
    return this.httpClient.put<Ator>(`${this.API}/${record._id}`, record);
  }

  remove(id: string) {
    return this.httpClient.delete(`${this.API}/${id}`);
  }
}
