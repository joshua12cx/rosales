import { MedicalHistory } from "./medicalhistory.entity";

export interface Diagnosis {
  idDiagnosis: number;
  medicalHistory: MedicalHistory;  // Relación
  diagnosisDate: Date;
  description: string;
  recommendations: string;
}
