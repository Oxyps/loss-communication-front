import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { CommunicationModel } from '../models/communication.model';
import { BaseService } from './base.service';

const url = `${environment.api_url}/loss/communications/`;

@Injectable({
  providedIn: 'root'
})
export class CommunicationsService extends BaseService<CommunicationModel> {
  constructor(protected http: HttpClient) {
    super(http, url);
  }
}
