import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Doctor } from '../entities/doctor.entity';
import { ApiResponse } from '../entities/apiresponse.entity';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private apiUrl = 'http://localhost:8080/api/doctors';

  constructor(private http: HttpClient) {}

  // Obtener todos los doctores
  getAll(): Observable<ApiResponse<Doctor[]>> {
    return this.http.get<ApiResponse<Doctor[]>>(`${this.apiUrl}/getAll`);
  }

  // Obtener un doctor por ID
  getOne(id: number): Observable<ApiResponse<Doctor>> {
    return this.http.get<ApiResponse<Doctor>>(`${this.apiUrl}/getOne/${id}`);
  }

  // Crear un nuevo doctor
  create(doctor: Doctor): Observable<ApiResponse<Doctor>> {
    return this.http.post<ApiResponse<Doctor>>(`${this.apiUrl}/create`, doctor);
  }

  // Actualizar un doctor existente
  update(id: number, doctor: Doctor): Observable<ApiResponse<Doctor>> {
    return this.http.put<ApiResponse<Doctor>>(`${this.apiUrl}/update/${id}`, doctor);
  }

  // Eliminar un doctor por ID
  delete(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/delete/${id}`);
  }
}
