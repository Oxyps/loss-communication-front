import { BaseModel } from './base.model';

export interface TillageModel extends BaseModel {
  location?: string;

  longitude?: string | number;
  latitude?: string | number;

  type: string;
  harvest_date: string;
}

