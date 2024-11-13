import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from '../entities/patient.entity';
import { ApiResponse } from '../entities/apiresponse.entity';
import { PatientDTO } from '../dto/patient.Dto';



@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private apiUrl = 'http://localhost:8080/api/patients';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResponse<Patient[]>> {
    return this.http.get<ApiResponse<Patient[]>>(`${this.apiUrl}/getAll`);
  }

  getOne(id: number): Observable<ApiResponse<Patient>> {
    return this.http.get<ApiResponse<Patient>>(`${this.apiUrl}/getOne/${id}`);
  }

  create(dto: PatientDTO): Observable<ApiResponse<void>> {
    return this.http.post<ApiResponse<void>>(`${this.apiUrl}/create`, dto);
  }

  update(id: number, dto: PatientDTO): Observable<ApiResponse<void>> {
    return this.http.put<ApiResponse<void>>(`${this.apiUrl}/update/${id}`, dto);
  }

  delete(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/delete/${id}`);
  }
}
