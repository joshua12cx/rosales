import { Component, OnInit } from '@angular/core';
import { Appointment } from '../../core/entities/appointment.entity';
import { AppointmentService } from '../../core/services/appointment.service';
import { ApiResponse } from '../../core/entities/apiresponse.entity';

import { DoctorService } from '../../core/services/doctor.service';
import { PatientService } from '../../core/services/patient.service';
import { TreatmentService } from '../../core/services/treatment.service';
import { Doctor } from '../../core/entities/doctor.entity';
import { Patient } from '../../core/entities/patient.entity';
import { Treatment } from '../../core/entities/treatment.entity';
import { AppointmentDTO } from '../../core/dto/appointment.Dto';

declare var window: any;

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent implements OnInit {
  citas: Appointment[] = [];
  doctores: Doctor[] = [];
  pacientes: Patient[] = [];
  tratamientos: Treatment[] = [];

  filtroDNI: string = '';
  filtroFecha: string = '';
  filtroEstado: string = '';
  citaActual: AppointmentDTO = this.inicializarCita();
  esEdicion: boolean = false;
  modal: any;

  constructor(
    private appointmentService: AppointmentService,
    private doctorService: DoctorService,
    private patientService: PatientService,
    private treatmentService: TreatmentService
  ) {}

  ngOnInit() {
    this.modal = new window.bootstrap.Modal(document.getElementById('citaModal'));
    this.cargarCitas();
    this.cargarDoctores();
    this.cargarPacientes();
    this.cargarTratamientos();
  }

  cargarCitas() {
    this.appointmentService.getAll().subscribe((response: ApiResponse<Appointment[]>) => {
      if (response.success) {
        this.citas = response.data;
      }
    });
  }

  cargarDoctores() {
    this.doctorService.getAll().subscribe((response: ApiResponse<Doctor[]>) => {
      if (response.success) {
        this.doctores = response.data;
      }
    });
  }

  cargarPacientes() {
    this.patientService.getAll().subscribe((response: ApiResponse<Patient[]>) => {
      if (response.success) {
        this.pacientes = response.data;
      }
    });
  }

  cargarTratamientos() {
    this.treatmentService.getAll().subscribe((response: ApiResponse<Treatment[]>) => {
      if (response.success) {
        this.tratamientos = response.data;
      }
    });
  }

  inicializarCita(): AppointmentDTO {
    return {
      idappointment: null,
      appointmentDate: new Date(),
      appointmentDateEnd: new Date(),
      state: 'Pendiente',
      notes: '',
      doctorId: null,
      patientId: null,
      treatmentId: null,
    };
  }

  openModal() {
    this.citaActual = this.inicializarCita();
    this.esEdicion = false;
    this.modal.show();
  }

  editarCita(cita: Appointment) {
    this.citaActual = {
      idappointment: cita.idAppointment,
      appointmentDate: cita.appointmentDate, // Usar fecha directamente
      appointmentDateEnd: cita.appointmentDateEnd, // Usar fecha directamente
      state: cita.state,
      notes: cita.notes || '',
      doctorId: cita.doctor.idDoctor,
      patientId: cita.patient.idPatient,
      treatmentId: cita.treatment.idTreatment,
    };
    this.esEdicion = true;
    this.modal.show();
  }
  
  

  guardarCita() {
    if (this.esEdicion) {
      // Usar `idappointment` para la URL de actualización
      this.appointmentService.update(this.citaActual.idappointment!, this.citaActual).subscribe(
        () => {
          this.cargarCitas();
          this.modal.hide();
        },
        (error) => {
          console.error('Error en la actualización de la cita:', error);
        }
      );
    } else {
      this.appointmentService.create(this.citaActual).subscribe(
        () => {
          this.cargarCitas();
          this.modal.hide();
        },
        (error) => {
          console.error('Error en la creación de la cita:', error);
        }
      );
    }
  }

  eliminarCita(id: number) {
    if(confirm('¿Estas seguro de que deseas eliminar este paciente?')){
    this.appointmentService.delete(id).subscribe({
      next: () => {
        alert('¿estas seguro que quieres eliminar esta cita?');
       this.cargarCitas(); 
      },
      error: (error) => {
        console.error('Error al eliminar el cita:', error);
alert('ocurrio un error al intentar eliminar cita')
      }
      
    }
  );
}
  }

  filtrarCitas() {
    return this.citas.filter(cita => 
      (this.filtroDNI ? cita.patient.person.dni.includes(this.filtroDNI) : true) &&
      (this.filtroFecha ? this.formatearFecha(cita.appointmentDate) === this.filtroFecha : true) &&
      (this.filtroEstado ? cita.state === this.filtroEstado : true)
    );
  }

  formatearFecha(fecha: any): string {
    // Asegurarse de que `fecha` es un objeto `Date` válido
    const dateObj = fecha instanceof Date ? fecha : new Date(fecha);

    // Validar que `dateObj` es una fecha válida
    if (isNaN(dateObj.getTime())) {
        return ''; // Retorna una cadena vacía si `fecha` no es válida
    }

    // Formatea la fecha a 'YYYY-MM-DD'
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

}
