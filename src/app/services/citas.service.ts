// services/citas.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitasService {
  private apiUrl = 'http://localhost:3000/api/citas'; // URL de tu API

  constructor(private http: HttpClient) {}

  // Obtener todas las citas
  getCitas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Obtener cita por DNI o fecha
  getCitasByFilter(dni: string, fecha: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?dni=${dni}&fecha=${fecha}`);
  }

  // Crear nueva cita
  createCita(cita: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, cita);
  }

  // Actualizar cita
  updateCita(id: string, cita: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, cita);
  }

  // Eliminar cita
  deleteCita(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
