import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isSidebarOpen = true;

  onSidebarToggle(isOpen: boolean): void {
    this.isSidebarOpen = isOpen; // Actualiza el estado según el sidebar
  }
}
