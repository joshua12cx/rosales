import { Component, OnInit } from '@angular/core';
import { Patient } from '../../core/entities/patient.entity';
import { Person } from '../../core/entities/person.entity';

import { PatientService } from '../../core/services/patient.service';
import { PatientDTO } from '../../core/dto/patient.Dto';
declare var window: any;

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit {
  pacientes: Patient[] = [];
  personas: Person[] = []; // Lista de personas
  citaActual: PatientDTO = { personId: 0 };
  esEdicion: boolean = false;
  filtroDNI: string = '';
  filtroNombre: string = '';
  modal: any;

  constructor(private patientService: PatientService) {}

  ngOnInit() {
    this.modal = new window.bootstrap.Modal(document.getElementById('citaModal'));
    this.cargarPacientes();
    this.cargarPersonas(); // Cargar personas al inicio
  }

  cargarPacientes() {
    this.patientService.getAll().subscribe({
      next: (response) => {
        if (response.success) {
          this.pacientes = response.data || [];
        } else {
          console.error('Error al cargar pacientes:', response.message);
        }
      },
      error: (error) => {
        console.error('Error en la conexión con el backend:', error);
      }
    });
  }

  cargarPersonas() {
    this.patientService.getAllPersons().subscribe({
      next: (response) => {
        if (response.success) {
          this.personas = response.data || [];
        } else {
          console.error('Error al cargar personas:', response.message);
        }
      },
      error: (error) => {
        console.error('Error en la conexión con el backend:', error);
      }
    });
  }

  openModal() {
    this.citaActual = { personId: 0 }; // Resetear citaActual
    this.esEdicion = false;
    this.modal.show();
  }

  editarCita(cita: Patient) {
    this.citaActual = { personId: cita.person.idPerson }; // Usar solo personId
    this.esEdicion = true;
    this.modal.show();
  }

  guardarCita() {
    if (this.esEdicion) {
      this.patientService.update(this.citaActual.personId, this.citaActual).subscribe({
        next: () => {
          this.cargarPacientes();
          this.modal.hide();
        },
        error: (error) => {
          console.error('Error al actualizar paciente:', error);
        }
      });
    } else {
      this.patientService.create(this.citaActual).subscribe({
        next: () => {
          this.cargarPacientes();
          this.modal.hide();
        },
        error: (error) => {
          console.error('Error al crear paciente:', error);
        }
      });
    }
  }

  eliminarCita(id: number) {
    this.patientService.delete(id).subscribe({
      next: () => {
        this.cargarPacientes();
      },
      error: (error) => {
        console.error('Error al eliminar paciente:', error);
      }
    });
  }

  filtrarCitas() {
    return this.pacientes.filter(paciente => {
      const persona = this.personas.find(p => p.idPerson === paciente.person.idPerson);
      return (
        (this.filtroDNI ? persona?.dni.includes(this.filtroDNI) : true) &&
        (this.filtroNombre ? persona?.firstName.toLowerCase().includes(this.filtroNombre.toLowerCase()) : true)
      );
    });
  }

  obtenerNombreCompleto(idPerson: number): string {
    const persona = this.personas.find(p => p.idPerson === idPerson);
    return persona ? `${persona.firstName} ${persona.lastNameFather} ${persona.lastNameMother}` : '';
  }
}
