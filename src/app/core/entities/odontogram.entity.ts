import { MedicalHistory } from "./medicalhistory.entity";


export interface Odontogram {
  idOdontogram: number;
  medicalHistory: MedicalHistory;
  creationDate: Date;
  details: string;
}
