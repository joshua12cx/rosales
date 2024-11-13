import { Patient } from "./patient.entity";

export interface MedicalHistory {
  idHistory: number;
  creationDate: Date;
  patient: Patient;               // Relación
  allergies: string;
  observations: string;
}
