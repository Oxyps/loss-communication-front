import { BaseModel } from './base.model';
import { FarmerModel } from './farmer.model';
import { TillageModel } from './tillage.model';

type Type = { [key: string]: string };

export const LOSS_CAUSES = {
  'EXCESSIVE_RAIN': 'Chuva excessiva',
  'FROST': 'Geada',
  'FROZEN_RAIN': 'Granizo',
  'DRY': 'Seca',
  'GALE': 'Vendaval',
  'THUNDER': 'Raio',
} as Type;

export interface CommunicationModel extends BaseModel {
  farmer: FarmerModel;
  tillage: TillageModel;

  loss_cause: string;
  is_dirty: boolean;
}
