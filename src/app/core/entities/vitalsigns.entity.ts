import { MedicalHistory } from "./medicalhistory.entity";


export interface VitalSigns {
  idVitalSign: number;
  medicalHistory: MedicalHistory;
  measurementDate: Date;
  bloodPressure: string;
  heartRate: number;
  temperature: number;
  respiratoryRate: number;
}
