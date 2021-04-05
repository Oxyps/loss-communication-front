import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BaseModel } from '../models/base.model';

export interface Response<T> {
  data: T[];
}

export class BaseService<T extends BaseModel> {
  constructor(
    protected http: HttpClient,
    protected url: string,
  ) {}

  findAll(): Observable<Response<T>> {
    return this.http.get<Response<T>>(this.url);
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
      return this.http.post<T>(this.url, model);
    }
  }
}
