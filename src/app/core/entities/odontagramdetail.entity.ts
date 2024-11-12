import { Odontogram } from "./odontogram.entity";


export interface OdontogramDetail {
  idDetail: number;
  odontogram: Odontogram;
  tooth: string;
  toothCondition: string;
  treatment: string;
  observations: string;
}
