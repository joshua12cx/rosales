import { Component } from '@angular/core';

@Component({
  selector: 'app-historias',
  templateUrl: './historias.component.html',
  styleUrls: ['./historias.component.css']
})
export class HistoriasComponent {
  // Lista de usuarios
  usuarios = [
    { dni: '12345678', nombre: 'Juan',apellidos:'Pérez', fecha: '2023-01-01', telefono: '123456789' },
    { dni: '87654321', nombre: 'Ana ',apellidos:'Pérez', fecha: '2023-02-15', telefono: '987654321' },
    { dni: '11223344', nombre: 'Carlos ',apellidos:'Pérez', fecha: '2023-03-20', telefono: '111222333' }
  ];
  
  // Variables para el filtro de búsqueda
  filtroDni = '';
  filtroNombre = '';
  usuariosFiltrados = [...this.usuarios];

  // Usuario seleccionado para visualización/edición/agregado
  usuarioSeleccionado: any = {};

  constructor() {}

  // Filtra la lista de usuarios en base al DNI y al nombre
  filtrarUsuarios() {
    this.usuariosFiltrados = this.usuarios.filter(usuario => 
      usuario.dni.includes(this.filtroDni) &&
      usuario.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase())
    );
  }

  // Método para visualizar la información de un usuario en el modal
  visualizarUsuario(usuario: any) {
    this.usuarioSeleccionado = { ...usuario };
    this.abrirModal();
  }

  // Método para editar un usuario
  editarUsuario(usuario: any) {
    this.usuarioSeleccionado = { ...usuario };
    this.abrirModal();
  }

  // Método para eliminar un usuario
  eliminarUsuario(usuario: any) {
    const index = this.usuarios.findIndex(u => u.dni === usuario.dni);
    if (index !== -1) {
      this.usuarios.splice(index, 1);
      this.filtrarUsuarios(); // Actualizar lista filtrada
    }
  }

  // Método para agregar o actualizar un usuario
  registrarUsuario() {
    if (this.usuarioSeleccionado.dni) {
      const index = this.usuarios.findIndex(u => u.dni === this.usuarioSeleccionado.dni);
      if (index !== -1) {
        // Actualiza el usuario existente
        this.usuarios[index] = { ...this.usuarioSeleccionado };
      } else {
        // Agrega un nuevo usuario
        this.usuarios.push({ ...this.usuarioSeleccionado });
      }
      this.filtrarUsuarios();
      this.cerrarModal();
      this.usuarioSeleccionado = {}; // Limpia el formulario
    }
  }

  // Método para abrir el modal
  abrirModal() {
    const modal = new (window as any).bootstrap.Modal(document.getElementById('usuarioModal'));
    modal.show();
  }

  // Método para cerrar el modal
  cerrarModal() {
    const modal = new (window as any).bootstrap.Modal(document.getElementById('usuarioModal'));
    modal.hide();
  }
}
