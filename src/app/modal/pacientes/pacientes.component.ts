import { Component } from '@angular/core';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrl: './pacientes.component.css'
})
export class PacientesComponent {
  isOpenModal = false;
  emitirFunction: Function = () => {};
  openModal() {
    this.isOpenModal = true;
  }

  uniqueFunction($event: Function) {
    this.emitirFunction = $event;
  }
}
