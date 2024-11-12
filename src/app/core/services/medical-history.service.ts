import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../entities/apiresponse.entity';
import { MedicalHistory } from '../entities/medicalhistory.entity';


@Injectable({
  providedIn: 'root'
})
export class MedicalHistoryService {
  private apiUrl = 'http://localhost:8080/api/medicalHistories';

  constructor(private http: HttpClient) { }

  getAll(): Observable<ApiResponse<MedicalHistory[]>> {
    return this.http.get<ApiResponse<MedicalHistory[]>>(`${this.apiUrl}/getAll`);
  }

  getById(id: number): Observable<ApiResponse<MedicalHistory>> {
    return this.http.get<ApiResponse<MedicalHistory>>(`${this.apiUrl}/getOne/${id}`);
  }

  create(medicalHistory: any): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/create`, medicalHistory);
  }

  update(id: number, medicalHistory: any): Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(`${this.apiUrl}/update/${id}`, medicalHistory);
  }

  delete(id: number): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/delete/${id}`);
  }
}
