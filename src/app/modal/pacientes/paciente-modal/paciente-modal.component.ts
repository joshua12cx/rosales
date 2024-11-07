import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-paciente-modal',
  templateUrl: './paciente-modal.component.html',
  styleUrl: './paciente-modal.component.css'
})
export class PacienteModalComponent implements AfterViewInit {

  filtroDNI: string = '';
  filtroFecha: string = '';
  citaActual: any = {};
  esEdicion: boolean = false;

  @Output() $emitirFunction = new EventEmitter<Function>();

  ngAfterViewInit(): void {
    this.$emitirFunction.emit(this.guardarCita);
  }

  public guardarCita() {
    console.log("hola estoy ejecutando");
  }
}
