import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { TillageModel } from '../models/tillage.model';
import { BaseService } from './base.service';

const url = `${environment.api_url}/tillages/`;

export class TillageService extends BaseService<TillageModel> {
  constructor(protected http: HttpClient) {
    super(http, url);
  }
}
