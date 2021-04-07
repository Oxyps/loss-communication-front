import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { FarmerModel } from '../models/farmer.model';
import { BaseService } from './base.service';

const url = `${environment.api_url}/loss/farmers`;

@Injectable({
  providedIn: 'root'
})
export class FarmersService extends BaseService<FarmerModel> {
  constructor(protected http: HttpClient) {
    super(http, url);
  }
}
