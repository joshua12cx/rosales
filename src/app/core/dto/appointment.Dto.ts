export interface AppointmentDTO {
    idappointment:number | null;
    appointmentDate: Date;
    appointmentDateEnd: Date;  // Cambiado a Date en lugar de string
    state: string;
    notes?: string;
    doctorId: number | null;
    patientId: number | null;
    treatmentId: number | null;
   
}
