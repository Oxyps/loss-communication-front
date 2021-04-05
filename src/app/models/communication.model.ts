import { BaseModel } from './base.model';
import { FarmerModel } from './farmer.model';
import { TillageModel } from './tillage.model';

export enum LOSS_CAUSES {
  EXCESSIVE_RAIN = 'Chuva excessiva',
  FROST = 'Geada',
  FROZEN_RAIN = 'Granizo',
  DRY = 'Seca',
  GALE = 'Vendaval',
  THUNDER = 'Raio',
}

export interface CommunicationModel extends BaseModel {
  farmer: FarmerModel;
  tillage: TillageModel;
  loss_cause: LOSS_CAUSES;
}
