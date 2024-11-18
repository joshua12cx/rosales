import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../core/services/patient.service';
import { PersonService } from '../../core/services/person.service';
import { Patient } from '../../core/entities/patient.entity';
import { Person } from '../../core/entities/person.entity';
import { PatientDTO } from '../../core/dto/patient.Dto';
import { ApiResponse } from '../../core/entities/apiresponse.entity';

declare var window: any;

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit {
  pacientes: Patient[] = [];
  personas: Person[] = [];
  filtroNombre: string = '';
  filtroDNI: string = '';
  filtroApellido: string = '';
  filtroFechaNacimiento: string = '';
  filtroTelefono: string = '';
  pacienteActual: PatientDTO = { personId: 0 };
  personaSeleccionada: Person | null = null;
  esEdicion: boolean = false;
  modal: any;

  constructor(
    private patientService: PatientService,
    private personService: PersonService
  ) {}

  ngOnInit() {
    this.modal = new window.bootstrap.Modal(document.getElementById('pacienteModal'));
    this.cargarPacientes();
    this.cargarPersonas();
  }

  cargarPacientes() {
    this.patientService.getAll().subscribe({
      next: (response: ApiResponse<Patient[]>) => {
        if (response.success) {
          this.pacientes = response.data;
        }
      },
      error: (err) => console.error('Error al cargar pacientes:', err)
    });
  }

  cargarPersonas() {
    this.personService.getAll().subscribe({
      next: (response: ApiResponse<Person[]>) => {
        if (response.success) {
          this.personas = response.data;
        }
      },
      error: (err) => console.error('Error al cargar personas:', err)
    });
  }

  openModal() {
    this.pacienteActual = { personId: 0 };
    this.personaSeleccionada = null;
    this.esEdicion = false;
    this.modal.show();
  }

  seleccionarPersona(event: Event) {
    const target = event.target as HTMLSelectElement | null;
    if (target && target.value) {
      const personaId = Number(target.value);
      this.personaSeleccionada = this.personas.find(persona => persona.idPerson === personaId) || null;
    }
  }
  

  guardarPaciente() {
    if (this.esEdicion) {
      console.error('Edición de pacientes aún no implementada');
    } else {
      this.patientService.create(this.pacienteActual).subscribe({
        next: () => {
          this.cargarPacientes();
          this.modal.hide();
        },
        error: (err) => console.error('Error al guardar paciente:', err)
      });
    }
  }

  filtrarPacientes() {
    return this.pacientes.filter(paciente =>
      (this.filtroNombre ? paciente.person.firstName.toLowerCase().includes(this.filtroNombre.toLowerCase()) : true) &&
      (this.filtroDNI ? paciente.person.dni.includes(this.filtroDNI) : true) 
    );
  }

  formatearFecha(fecha: Date): string {
    const year = fecha.getFullYear();
    const month = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Meses de 0-11
    const day = fecha.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  editarPaciente(paciente: Patient) {
    this.pacienteActual = {
      personId: paciente.person.idPerson
    };
    this.personaSeleccionada = paciente.person;
    this.esEdicion = true;
    this.modal.show();
  }

  eliminarPaciente(idPatient: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este paciente?')) {
      this.patientService.delete(idPatient).subscribe({
        next: () => {
          alert('Paciente eliminado con éxito.');
          this.cargarPacientes();
        },
        error: (error) => {
          console.error('Error al eliminar el paciente:', error);
          alert('Ocurrió un error al intentar eliminar el paciente.');
        }
      });
    }
  }
}
