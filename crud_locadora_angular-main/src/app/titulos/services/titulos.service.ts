import { Titulo } from './../modelo/titulo';
import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {first, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TitulosService {

  private readonly API = 'api/titulo';

  constructor(private httpClient: HttpClient) {

  }

  listar() {
    return this.httpClient.get<Titulo[]>(this.API)
      .pipe(
        first(),
        tap(titulos => console.log()))
  }

  save(record: Titulo) {
    console.log(record);
    if (record._id != 0) {

      return this.update(record);
    }
    return this.create(record);
  }

  loadbyId(id: number) {
    return this.httpClient.get<Titulo>(`${this.API}/${id}`);
  }

  private create(record: Titulo) {
    return this.httpClient.post<Titulo>(this.API, record);
  }

  private update(record: Titulo) {
    return this.httpClient.put<Titulo>(`${this.API}/${record._id}`, record);
  }

  remove(id: number) {
    return this.httpClient.delete(`${this.API}/${id}`);
  }

}
