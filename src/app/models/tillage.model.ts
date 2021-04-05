import { BaseModel } from './base.model';

export interface Tillage extends BaseModel {
  location: Point;
  type: string;
  harvest_date: string;
}

export interface Point {
  srid: string;
  x: string;
  y: string;
  z: string;
}
