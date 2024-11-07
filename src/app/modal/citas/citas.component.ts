import { Component } from '@angular/core';
declare var window: any;

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent {
  citas = [
    { dni: '48573926', nombre: 'Mark', apellidos: 'Otto', nroHistoria: '10', estado: 'Pendiente' },
    { dni: '95731682', nombre: 'Jacob', apellidos: 'Thornton', nroHistoria: '11', estado: 'Activa' },
    { dni: '12856347', nombre: 'Larry', apellidos: 'the Bird', nroHistoria: '12', estado: 'Terminada' }
  ];

  filtroDNI: string = '';
  filtroFecha: string = '';
  citaActual: any = {};
  esEdicion: boolean = false;
  modal: any;

  ngOnInit() {
    this.modal = new window.bootstrap.Modal(document.getElementById('citaModal'));
  }

  openModal() {
    this.citaActual = {};
    this.esEdicion = false;
    this.modal.show();
  }

  editarCita(cita: any) {
    this.citaActual = { ...cita };
    this.esEdicion = true;
    this.modal.show();
  }

  guardarCita() {
    if (this.esEdicion) {
      // Actualizar cita existente
      const index = this.citas.findIndex(c => c.dni === this.citaActual.dni);
      if (index !== -1) {
        this.citas[index] = { ...this.citaActual };
      }
    } else {
      // Agregar nueva cita
      this.citas.push({ ...this.citaActual });
    }
    this.modal.hide();
  }

  eliminarCita(index: number) {
    this.citas.splice(index, 1);
  }
}
