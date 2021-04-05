import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { CommunicationModel } from '../models/communication.model';
import { BaseService } from './base.service';

const url = `${environment.api_url}/communications/`;

export class CommunicationService extends BaseService<CommunicationModel> {
  constructor(protected http: HttpClient) {
    super(http, url);
  }
}
