import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Consultation } from '../entities/consultation.entity';
import { ApiResponse } from '../entities/apiresponse.entity';


@Injectable({
  providedIn: 'root'
})
export class ConsultationService {
  private apiUrl = 'http://localhost:8080/api/consultations';

  constructor(private http: HttpClient) { }

  getAll(): Observable<ApiResponse<Consultation[]>> {
    return this.http.get<ApiResponse<Consultation[]>>(`${this.apiUrl}/getAll`);
  }

  getById(id: number): Observable<ApiResponse<Consultation>> {
    return this.http.get<ApiResponse<Consultation>>(`${this.apiUrl}/getOne/${id}`);
  }

  create(consultation: any): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/create`, consultation);
  }

  update(id: number, consultation: any): Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(`${this.apiUrl}/update/${id}`, consultation);
  }

  delete(id: number): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/delete/${id}`);
  }
}
