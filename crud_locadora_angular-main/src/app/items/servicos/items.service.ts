import { Injectable } from '@angular/core';
import { Item } from '../modelo/item';
import {HttpClient} from "@angular/common/http";
import {first, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  private readonly API = 'api/item';

  constructor(private httpClient: HttpClient) {
  }

  listar() {
    return this.httpClient.get<Item[]>(this.API)
      .pipe(
        first(),
        tap(items => console.log()))
  }

  save(record: Item) {
    console.log(record);
    if (record._id != 0) {

      return this.update(record);
    }
    return this.create(record);
  }

  loadbyId(id: number) {
    return this.httpClient.get<Item>(`${this.API}/${id}`);
  }

  private create(record: Item) {
    return this.httpClient.post<Item>(this.API, record);
  }

  private update(record: Item) {
    return this.httpClient.put<Item>(`${this.API}/${record._id}`, record);
  }

  remove(id: number) {
    return this.httpClient.delete(`${this.API}/${id}`);
  }

}
