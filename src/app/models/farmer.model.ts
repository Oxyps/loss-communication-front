import { BaseModel } from './base.model';

export interface FarmerModel extends BaseModel {
  cpf: string;
  email: string;
  name: string;
}
