import { BaseModel } from './base.model';

export interface Farmer extends BaseModel {
  cpf: string;
  email: string;
  name: string;
}
