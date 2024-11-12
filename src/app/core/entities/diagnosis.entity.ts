import { MedicalHistory } from "./medicalhistory.entity";

export interface Diagnosis {
  idDiagnosis: number;
  medicalHistory: MedicalHistory;
  diagnosisDate: Date;
  description: string;
  recommendations: string;
}
