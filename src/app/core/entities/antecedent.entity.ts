import { MedicalHistory } from "./medicalhistory.entity";


export interface Antecedent {
  idAntecedent: number;
  medicalHistory: MedicalHistory;
  type: string;
  description: string;
  date: Date;
}
