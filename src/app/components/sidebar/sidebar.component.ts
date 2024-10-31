import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isSidebarOpen: boolean = true; // Controla si el sidebar está abierto o cerrado
  username: string = 'Usuario'; // Inicialización por defecto

  // Evento que se emite al componente padre cuando el sidebar cambia de estado
  @Output() sidebarToggled = new EventEmitter<boolean>();

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.getUsername();
  }

  toggleSidebar(): void {
    // Cambia el estado del sidebar al hacer clic en el botón de hamburguesa
    this.isSidebarOpen = !this.isSidebarOpen;
    this.sidebarToggled.emit(this.isSidebarOpen); // Emitimos el nuevo estado
  }

  getUsername(): void {
    // Obtiene el nombre del usuario desde el almacenamiento local
    this.username = localStorage.getItem('username') || 'Usuario';
  }

  logout(): void {
    // Al cerrar sesión, elimina el nombre del usuario del almacenamiento local
    localStorage.removeItem('username');
    this.router.navigate(['/login']); // Redirige al usuario a la página de inicio de sesión
  }
}
