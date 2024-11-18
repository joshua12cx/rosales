import { Component, OnInit } from '@angular/core';
import { Person } from '../../core/entities/person.entity';

import { PersonService } from '../../core/services/person.service';
import { PersonDTO } from '../../core/dto/person.Dto';
declare var window: any;

@Component({
  selector: 'app-personas',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {
  personas: Person[] = [];
  personaActual: PersonDTO = {
    idPerson: 0,
    firstName: '',
    lastNameFather: '',
    lastNameMother: '',
    gender: 'M',
    birthDate: new Date(),
    dni: '',
    address: '',
  };
  esEdicion: boolean = false;
  filtroDNI: string = '';
  filtroNombre: string = '';
  modal: any;

  constructor(private personService: PersonService) {}

  ngOnInit() {
    this.modal = new window.bootstrap.Modal(document.getElementById('personaModal'));
    this.cargarPersonas();
  }

  cargarPersonas() {
    this.personService.getAll().subscribe({
      next: (response) => {
        if (response.success) {
          this.personas = response.data || [];
        }
      },
      error: (error) => {
        console.error('Error al cargar personas:', error);
      }
    });
  }

  openModal() {
    this.personaActual = {
      idPerson: 0,
      firstName: '',
      lastNameFather: '',
      lastNameMother: '',
      gender: 'M',
      birthDate: new Date(),
      dni: '',
      address: '',
    };
    this.esEdicion = false;
    this.modal.show();
  }

  editarPersona(persona: Person) {
    this.personaActual = { ...persona };
    this.esEdicion = true;
    this.modal.show();
  }

  guardarPersona() {
    if (this.esEdicion) {
      this.personService.update(this.personaActual.idPerson, this.personaActual).subscribe({
        next: () => {
          this.cargarPersonas();
          this.modal.hide();
        },
        error: (error) => {
          console.error('Error al actualizar persona:', error);
        }
      });
    } else {
      this.personService.create(this.personaActual).subscribe({
        next: () => {
          this.cargarPersonas();
          this.modal.hide();
        },
        error: (error) => {
          console.error('Error al crear persona:', error);
        }
      });
    }
  }

  eliminarPersona(id: number) {
    this.personService.delete(id).subscribe({
      next: () => this.cargarPersonas(),
      error: (error) => console.error('Error al eliminar persona:', error),
    });
  }

  filtrarPersonas() {
    return this.personas.filter(persona =>
      (this.filtroDNI ? persona.dni.includes(this.filtroDNI) : true) &&
      (this.filtroNombre ? persona.firstName.toLowerCase().includes(this.filtroNombre.toLowerCase()) : true)
    );
  }
}