import { MedicalHistory } from "./medicalhistory.entity";

export interface ClinicalExam {
  idExam: number;
  medicalHistory: MedicalHistory;  // Relación
  examType: string;
  examDate: Date;
  findings: string;
  recommendations: string;
}
