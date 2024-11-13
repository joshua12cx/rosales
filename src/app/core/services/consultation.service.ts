import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../entities/apiresponse.entity';
import { Consultation } from '../entities/consultation.entity';
import { ConsultationDTO } from '../dto/consultation.Dto';


@Injectable({
  providedIn: 'root'
})
export class ConsultationService {
  private apiUrl = 'http://localhost:8080/api/consultations';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResponse<Consultation[]>> {
    return this.http.get<ApiResponse<Consultation[]>>(`${this.apiUrl}/getAll`);
  }

  getOne(id: number): Observable<ApiResponse<Consultation>> {
    return this.http.get<ApiResponse<Consultation>>(`${this.apiUrl}/getOne/${id}`);
  }

  create(dto: ConsultationDTO): Observable<ApiResponse<void>> {
    return this.http.post<ApiResponse<void>>(`${this.apiUrl}/create`, dto);
  }

  update(id: number, dto: ConsultationDTO): Observable<ApiResponse<void>> {
    return this.http.put<ApiResponse<void>>(`${this.apiUrl}/update/${id}`, dto);
  }

  delete(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/delete/${id}`);
  }
}
