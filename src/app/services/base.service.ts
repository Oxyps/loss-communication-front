import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseModel } from '../models/base.model';

// export interface Response<T> {
//   data: T[];

//   current_page: number;
//   previous_page: number;
//   next_page: number;

//   total: number;
// }

@Injectable({
  providedIn: 'root'
})
export class BaseService<T extends BaseModel> {
  constructor(
    protected http: HttpClient,
    @Inject('url') protected url: string
  ) {}

  findAll(): Observable<T[]> {
    return this.http.get<T[]>(`${this.url}/`);
  }

  findById(id: string | number): Observable<T> {
    return this.http.get<T>(`${this.url}/${id}/`);
  }

  delete(id: string | number): Observable<T> {
    return this.http.delete<T>(`${this.url}/${id}/`);
  }

  save(model: T): Observable<T> {
    if (model.id) {
      return this.http.put<T>(`${this.url}/${model.id}/`, model);
    } else {
      return this.http.post<T>(`${this.url}/`, model);
    }
  }
}
