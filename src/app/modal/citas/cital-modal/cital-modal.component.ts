import { Component,  Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cital-modal',
  templateUrl: './cital-modal.component.html',
  styleUrl: './cital-modal.component.css'
})
export class CitalModalComponent {
  @Input() esEdicion: boolean = false; // Controla si es edición o nuevo registro
  @Input() citaActual: any = {}; // Almacena la información de la cita actual a editar o nueva
  @Output() onGuardarCita = new EventEmitter<any>(); // Evento para enviar los datos de la cita guardada
  @Output() onCerrarModal = new EventEmitter<void>(); // Evento para cerrar el modal desde el componente padre

  constructor() {}

  // Método para guardar la cita
  guardarCita() {
    if (this.validarFormulario()) {
      this.onGuardarCita.emit(this.citaActual);
      this.cerrarModal();
    }
  }

  // Método para cerrar el modal
  cerrarModal() {
    this.onCerrarModal.emit();
  }

  // Validación básica del formulario
  validarFormulario(): boolean {
    // Aquí puedes agregar la lógica de validación según los campos necesarios
    if (!this.citaActual.dni || !this.citaActual.nombre || !this.citaActual.apellidos) {
      alert("Por favor, completa los campos requeridos.");
      return false;
    }
    return true;
  }

}
