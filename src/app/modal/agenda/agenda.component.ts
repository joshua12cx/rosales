import { Component } from '@angular/core';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css'],
})
export class AgendaComponent {
  selectedDate: Date = new Date();
  hours: string[] = Array.from({ length: 24 }, (_, i) => `${i}:00`);

  // Lista de citas
  appointments = [
    {
      date: new Date(), // Fecha de la cita
      hour: '14:00', // Hora de la cita
      title: 'Cita con Juan Pérez',
      color: '#f28b82', // Color para la cita
    },
    {
      date: new Date(),
      hour: '15:00',
      title: 'Cita con María García',
      color: '#aecbfa',
    },
    // Agrega más citas según sea necesario
  ];

  getAppointmentsForHour(hour: string) {
    return this.appointments.filter(
      (appointment) =>
        this.formatDate(appointment.date) === this.formatDate(this.selectedDate) &&
        appointment.hour === hour
    );
  }

  prevDay() {
    this.selectedDate.setDate(this.selectedDate.getDate() - 1);
    this.selectedDate = new Date(this.selectedDate); // Actualiza la fecha
  }

  nextDay() {
    this.selectedDate.setDate(this.selectedDate.getDate() + 1);
    this.selectedDate = new Date(this.selectedDate); // Actualiza la fecha
  }

  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }
}
