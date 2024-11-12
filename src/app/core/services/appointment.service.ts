import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../entities/apiresponse.entity';
import { Appointment } from '../entities/appointment.entity';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = 'http://localhost:8080/api/appointments'; // Usa una variable en environment para almacenar la URL base

  constructor(private http: HttpClient) {}

  // Obtener todas las citas
  getAll(): Observable<ApiResponse<Appointment[]>> {
    return this.http.get<ApiResponse<Appointment[]>>(`${this.apiUrl}/getAll`);
  }

  // Obtener una cita por su ID
  getOne(id: number): Observable<ApiResponse<Appointment>> {
    return this.http.get<ApiResponse<Appointment>>(`${this.apiUrl}/getOne/${id}`);
  }

  // Crear una nueva cita
  create(appointment: Appointment): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/create`, appointment);
  }

  // Actualizar una cita existente
  update(id: number, appointment: Appointment): Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(`${this.apiUrl}/update/${id}`, appointment);
  }

  // Eliminar una cita
  delete(id: number): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/delete/${id}`);
  }
}
