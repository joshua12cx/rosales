import { Component, OnInit } from '@angular/core';

interface Day {
  date: Date;
  otherMonth: boolean;
  events: { date: Date; title: string; time: string }[]; // Incluye la propiedad time
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
  calendar: Day[][] = []; // Matriz para la vista mensual
  weekDates: Date[] = []; // Fechas para la vista semanal
  hours: string[] = Array.from({ length: 24 }, (_, i) => `${i}:00`); // Horas del día

  events = [
    { date: new Date(2024, 10, 8, 10, 0), title: '3 tareas pendientes', time: '10:00' },
    { date: new Date(2024, 10, 1, 9, 0), title: 'Día de Todos los Santos', time: '09:00' },
    { date: new Date(2024, 10, 2, 14, 30), title: 'Los Fieles Difuntos', time: '14:30' }
  ];

  ngOnInit() {
    this.generateCalendar();
  }

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
          event.date.toDateString() === currentDate.toDateString()
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

  generateWeek() {
    const startOfWeek = new Date(this.currentYear, this.currentMonth, this.currentDay - new Date(this.currentYear, this.currentMonth, this.currentDay).getDay());
    this.weekDates = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      return date;
    });
  }

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

  getTitle(): string {
    if (this.viewType === 'Mes') {
      return `${this.monthNames[this.currentMonth]} de ${this.currentYear}`;
    } else if (this.viewType === 'Semana') {
      return `Semana del ${this.getWeekRange()}`;
    } else if (this.viewType === 'Día') {
      return `Día ${this.selectedDate.toLocaleDateString()}`;
    }
    return '';
  }

  getWeekRange(): string {
    const startOfWeek = new Date(this.currentYear, this.currentMonth, this.currentDay - new Date(this.currentYear, this.currentMonth, this.currentDay).getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);
    return `${startOfWeek.toLocaleDateString()} - ${endOfWeek.toLocaleDateString()}`;
  }

  prevMonth() {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.generateCalendar();
  }

  nextMonth() {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.generateCalendar();
  }

  isToday(day: Day): boolean {
    const today = new Date();
    return (
      day.date.getDate() === today.getDate() &&
      day.date.getMonth() === today.getMonth() &&
      day.date.getFullYear() === today.getFullYear()
    );
  }

  selectDate(day: Day) {
    console.log("Fecha seleccionada:", day.date);
    console.log("Eventos para esta fecha:", day.events); // Muestra eventos con hora
  }
}
