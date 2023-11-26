import { Injectable } from '@angular/core';
import { Cliente } from '../modelo/Cliente';
import {HttpClient} from "@angular/common/http";
import {first, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private readonly API = 'api/socio';

  constructor(private httpClient: HttpClient) {

  }

  listar() {
    return this.httpClient.get<Cliente[]>(this.API)
      .pipe(
        first(),
        tap(clientes => console.log()))

  }

  save(record: Cliente) {
    console.log(record);
    if (record._id != 0) {

      return this.update(record);
    }
    return this.create(record);
  }

  loadbyId(id: number) {
    return this.httpClient.get<Cliente>(`${this.API}/${id}`);
  }

  private create(record: Cliente) {
    return this.httpClient.post<Cliente>(this.API, record);
  }

  private update(record: Cliente) {
    return this.httpClient.put<Cliente>(`${this.API}/${record._id}`, record);
  }

  remove(id: number) {
    return this.httpClient.delete(`${this.API}/${id}`);
  }

}
