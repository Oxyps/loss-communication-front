import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { FarmerModel } from '../models/farmer.model';
import { BaseService } from './base.service';

const url = `${environment.api_url}/farmers/`;

export class FarmerService extends BaseService<FarmerModel> {
  constructor(protected http: HttpClient) {
    super(http, url);
  }
}
