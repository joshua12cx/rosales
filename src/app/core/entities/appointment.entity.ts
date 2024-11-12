import { AppointmentSchedule } from "./appointmentschedule.entity";
import { Doctor } from "./doctor.entity";
import { Patient } from "./patient.entity";
import { Treatment } from "./treatment.entity";

export class Appointment {
  idAppointment: number = 0;
  appointmentDate: Date = new Date();
  patient: Patient = new Patient(); // Inicializamos patient
  treatment: Treatment = new Treatment();
  schedule: AppointmentSchedule = new AppointmentSchedule();
  doctor: Doctor = new Doctor();
  notes: string = '';
  state: string = '';
}
