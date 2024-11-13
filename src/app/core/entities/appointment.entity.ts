import { AppointmentSchedule } from "./appointmentschedule.entity";
import { Doctor } from "./doctor.entity";
import { Patient } from "./patient.entity";
import { Treatment } from "./treatment.entity";

export interface Appointment {
  idAppointment: number;
  appointmentDate: Date;
  appointmentDateEnd:Date;
  patient: Patient;                // Relación
  treatment: Treatment;             // Relación
  schedule: AppointmentSchedule;    // Relación
  doctor: Doctor;                   // Relación
  notes?: string;
  state: string;
}
