import { Component, OnInit } from '@angular/core';
import { Appointment } from '../../core/entities/appointment.entity';
import { AppointmentService } from '../../core/services/appointment.service';
import { ApiResponse } from '../../core/entities/apiresponse.entity';

declare var window: any;

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent implements OnInit {
  citas: Appointment[] = [];
  filtroDNI: string = '';
  filtroFecha: string = '';
  filtroEstado: string = '';
  citaActual: Appointment = new Appointment();
  esEdicion: boolean = false;
  modal: any;

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit() {
    // Inicializa el modal cuando el componente carga
    this.modal = new window.bootstrap.Modal(document.getElementById('citaModal'));
    this.cargarCitas();
  }

  cargarCitas() {
    // Carga todas las citas llamando al servicio
    this.appointmentService.getAll().subscribe((response: ApiResponse<Appointment[]>) => {
      if (response.success) {
        // Mapea las citas recibidas a instancias de Appointment
        this.citas = response.data.map(cita => Object.assign(new Appointment(), cita));
      }
    });
  }

  openModal() {
    // Abre el modal para agregar una nueva cita
    this.citaActual = new Appointment(); // Nueva instancia de Appointment para el formulario
    this.esEdicion = false; // Modo de creación
    this.modal.show();
  }

  editarCita(cita: Appointment) {
    // Abre el modal para editar una cita existente
    this.citaActual = Object.assign(new Appointment(), cita); // Copia los datos de la cita seleccionada
    this.esEdicion = true; // Modo de edición
    this.modal.show();
  }

  guardarCita() {
    console.log('Datos de citaActual antes de enviar:', this.citaActual); // Verificar datos
  
    // Asegurar valores en appointmentDate y schedule
    this.citaActual.appointmentDate = this.citaActual.appointmentDate || new Date().toISOString().split('T')[0];
    this.citaActual.schedule.startTime = this.citaActual.schedule.startTime || "00:00:00";
    this.citaActual.schedule.endTime = this.citaActual.schedule.endTime || "23:59:59";
  
    if (this.esEdicion) {
      // Llamada al servicio para actualizar la cita
      this.appointmentService.update(this.citaActual.idAppointment, this.citaActual).subscribe(
        () => {
          this.cargarCitas(); // Recargar citas después de la actualización
        },
        (error) => {
          console.error('Error en la actualización de la cita:', error); // Log de error si ocurre
        }
      );
    } else {
      // Llamada al servicio para crear una nueva cita
      this.appointmentService.create(this.citaActual).subscribe(
        () => {
          this.cargarCitas(); // Recargar citas después de la creación
        },
        (error) => {
          console.error('Error en la creación de la cita:', error); // Log de error si ocurre
        }
      );
    }
    this.modal.hide(); // Cierra el modal después de guardar o actualizar
  }
  

  eliminarCita(id: number) {
    // Llamada al servicio para eliminar una cita por su ID
    this.appointmentService.delete(id).subscribe(() => {
      this.cargarCitas(); // Recargar citas después de la eliminación
    });
  }

  filtrarCitas() {
    // Filtra las citas basándose en los criterios de DNI, fecha y estado
    return this.citas.filter(cita => 
      (this.filtroDNI ? cita.patient.person.dni.includes(this.filtroDNI) : true) &&
      (this.filtroFecha ? this.formatearFecha(cita.appointmentDate) === this.filtroFecha : true) &&
      (this.filtroEstado ? cita.state === this.filtroEstado : true)
    );
  }

  formatearFecha(fecha: Date): string {
    // Formatea la fecha a 'YYYY-MM-DD' para la comparación
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, '0');
    const day = String(fecha.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
