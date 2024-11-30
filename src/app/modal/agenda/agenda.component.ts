import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../core/services/appointment.service';
import { Appointment } from '../../core/entities/appointment.entity';

interface Day {
  date: Date;
  otherMonth: boolean;
  events: { title: string; time: string }[];
}

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css'],
})
export class AgendaComponent implements OnInit {
  currentYear: number = new Date().getFullYear();
  currentMonth: number = new Date().getMonth();
  currentDay: number = new Date().getDate();
  selectedDate: Date = new Date();
  viewType: string = 'Mes'; // Vista inicial
  monthNames: string[] = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  weekDays: string[] = ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'];
  calendar: Day[][] = [];
  weekDates: Date[] = [];
  hours: string[] = Array.from({ length: 24 }, (_, i) => `${i}:00`);
  events: any[] = []; // Aquí se almacenarán las citas del backend
  dateFormatter = new Intl.DateTimeFormat('es-ES', { dateStyle: 'short' });

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit() {
    this.loadAppointments();
    this.generateCalendar();
  }

  // Cargar citas desde el backend
  loadAppointments() {
    this.appointmentService.getAll().subscribe({
      next: (response) => {
        if (response.success) {
          this.events = response.data.map((appointment: Appointment) => ({
            date: new Date(appointment.appointmentDate),
            title: appointment.notes || `Cita con ${appointment.patient.person.firstName} ${appointment.patient.person.lastNameFather}`,
            time: `${this.formatTime(appointment.appointmentDate)} - ${this.formatTime(appointment.appointmentDateEnd)}`,
          }));
          this.generateCalendar(); // Regenera el calendario con las citas
        } else {
          console.error('Error al cargar citas:', response.message);
        }
      },
      error: (error) => {
        console.error('Error en la conexión con el backend:', error);
      },
    });
  }

  // Generar calendario mensual
  generateCalendar() {
    const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1).getDay();
    const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    let date = 1 - firstDayOfMonth;

    this.calendar = [];
    for (let week = 0; week < 6; week++) {
      const weekArray: Day[] = [];
      for (let day = 0; day < 7; day++) {
        const currentDate = new Date(this.currentYear, this.currentMonth, date);
        const eventsForDay = this.events.filter(event =>
          this.isSameDate(event.date, currentDate)
        );
        weekArray.push({
          date: currentDate,
          otherMonth: currentDate.getMonth() !== this.currentMonth,
          events: eventsForDay,
        });
        date++;
      }
      this.calendar.push(weekArray);
    }
  }

  // Generar vista semanal
  generateWeek() {
    const startOfWeek = new Date(this.currentYear, this.currentMonth, this.currentDay - new Date(this.currentYear, this.currentMonth, this.currentDay).getDay());
    this.weekDates = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      return date;
    });
  }

  // Cambiar vista
  setView(view: string) {
    this.viewType = view;
    if (view === 'Mes') {
      this.generateCalendar();
    } else if (view === 'Semana') {
      this.generateWeek();
    } else if (view === 'Día') {
      this.selectedDate = new Date(this.currentYear, this.currentMonth, this.currentDay);
    }
  }

  // Navegar al mes anterior
  prevMonth() {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.generateCalendar();
  }

  // Navegar al mes siguiente
  nextMonth() {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.generateCalendar();
  }

  // Navegar al día o semana anterior
  prevView() {
    if (this.viewType === 'Mes') {
      this.prevMonth();
    } else if (this.viewType === 'Semana') {
      this.currentDay -= 7;
      this.generateWeek();
    } else if (this.viewType === 'Día') {
      this.currentDay -= 1;
      this.selectedDate = new Date(this.currentYear, this.currentMonth, this.currentDay);
    }
  }

  // Navegar al día o semana siguiente
  nextView() {
    if (this.viewType === 'Mes') {
      this.nextMonth();
    } else if (this.viewType === 'Semana') {
      this.currentDay += 7;
      this.generateWeek();
    } else if (this.viewType === 'Día') {
      this.currentDay += 1;
      this.selectedDate = new Date(this.currentYear, this.currentMonth, this.currentDay);
    }
  }

  // Título de la vista actual
  getTitle(): string {
    if (this.viewType === 'Mes') {
      return `${this.monthNames[this.currentMonth]} de ${this.currentYear}`;
    } else if (this.viewType === 'Semana') {
      return `Semana del ${this.getWeekRange()}`;
    } else if (this.viewType === 'Día') {
      return `Día ${this.dateFormatter.format(this.selectedDate)}`;
    }
    return '';
  }

  // Rango de la semana
  getWeekRange(): string {
    const startOfWeek = new Date(this.currentYear, this.currentMonth, this.currentDay - new Date(this.currentYear, this.currentMonth, this.currentDay).getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);
    return `${this.dateFormatter.format(startOfWeek)} - ${this.dateFormatter.format(endOfWeek)}`;
  }

  // Comparar fechas (sin horas)
  isSameDate(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  // Formatear hora
  formatTime(date: string | Date): string {
    const parsedDate = new Date(date);
    return parsedDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  }

  // Verificar si un día es el día actual
  isToday(day: Day): boolean {
    const today = new Date();
    return this.isSameDate(today, day.date);
  }

  // Seleccionar una fecha
  selectDate(day: Day) {
    console.log('Fecha seleccionada:', this.dateFormatter.format(day.date));
    console.log('Eventos para esta fecha:', day.events);
  }
}
