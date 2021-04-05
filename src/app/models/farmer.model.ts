import { BaseModel } from './base.model';
import { Farmer } from './communication.model';
import { Tillage } from './tillage.model';

export enum LOSS_CAUSES {
  EXCESSIVE_RAIN = 'Chuva excessiva',
  FROST = 'Geada',
  FROZEN_RAIN = 'Granizo',
  DRY = 'Seca',
  GALE = 'Vendaval',
  THUNDER = 'Raio',
}

export interface Communication extends BaseModel {
  farmer: Farmer;
  tillage: Tillage;
  loss_cause: LOSS_CAUSES;
}
