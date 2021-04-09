import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseModel } from '../models/base.model';
import { ResponseType } from './interfaces/response-type';
import { RequestQueryType } from './interfaces/resquest-query-type';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T extends BaseModel> {
  constructor(
    protected http: HttpClient,
    @Inject('url') protected url: string
  ) {}

  findAll(query?: RequestQueryType<T>): Observable<ResponseType<T>> {
    let params = new HttpParams();

    if (query?.search) {
      params = params.append('search', query.search);
    }
    if (query?.page) {
      params = params.append('page', query.page.toString());
    }
    if (query?.cpf) {
      params = params.append('cpf', query.cpf);
    }

    return this.http.get<ResponseType<T>>(
      `${this.url}/`,
      { params }
    );
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
