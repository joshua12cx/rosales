import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Treatment } from '../entities/treatment.entity';
import { ApiResponse } from '../entities/apiresponse.entity';

@Injectable({
  providedIn: 'root'
})
export class TreatmentService {
  private apiUrl = 'http://localhost:8080/api/treatments';

  constructor(private http: HttpClient) {}

  // Obtener todos los tratamientos
  getAll(): Observable<ApiResponse<Treatment[]>> {
    return this.http.get<ApiResponse<Treatment[]>>(`${this.apiUrl}/getAll`);
  }

  // Obtener un tratamiento por ID
  getOne(id: number): Observable<ApiResponse<Treatment>> {
    return this.http.get<ApiResponse<Treatment>>(`${this.apiUrl}/getOne/${id}`);
  }

  // Crear un nuevo tratamiento
  create(treatment: Treatment): Observable<ApiResponse<Treatment>> {
    return this.http.post<ApiResponse<Treatment>>(`${this.apiUrl}/create`, treatment);
  }

  // Actualizar un tratamiento existente
  update(id: number, treatment: Treatment): Observable<ApiResponse<Treatment>> {
    return this.http.put<ApiResponse<Treatment>>(`${this.apiUrl}/update/${id}`, treatment);
  }

  // Eliminar un tratamiento por ID
  delete(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/delete/${id}`);
  }
}
