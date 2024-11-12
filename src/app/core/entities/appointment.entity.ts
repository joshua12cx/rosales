import { AppointmentSchedule } from "./appointmentschedule.entity";
import { Doctor } from "./doctor.entity";
import { Patient } from "./patient.entity";
import { Treatment } from "./treatment.entity";

export interface Appointment {
  estado: string;
  idAppointment: number;
  appointmentDate: Date;
  patient: Patient;
  treatment: Treatment;
  schedule: AppointmentSchedule;
  doctor: Doctor;
  notes: string;
}
