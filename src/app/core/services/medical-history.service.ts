import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../entities/apiresponse.entity';
import { MedicalHistory } from '../entities/medicalhistory.entity';
import { MedicalHistoryDTO } from '../dto/medicalhistory.Dto';


@Injectable({
  providedIn: 'root'
})
export class MedicalHistoryService {
  private apiUrl = 'http://localhost:8080/api/medicalHistories';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResponse<MedicalHistory[]>> {
    return this.http.get<ApiResponse<MedicalHistory[]>>(`${this.apiUrl}/getAll`);
  }

  getOne(id: number): Observable<ApiResponse<MedicalHistory>> {
    return this.http.get<ApiResponse<MedicalHistory>>(`${this.apiUrl}/getOne/${id}`);
  }

  create(dto: MedicalHistoryDTO): Observable<ApiResponse<void>> {
    return this.http.post<ApiResponse<void>>(`${this.apiUrl}/create`, dto);
  }

  update(id: number, dto: MedicalHistoryDTO): Observable<ApiResponse<void>> {
    return this.http.put<ApiResponse<void>>(`${this.apiUrl}/update/${id}`, dto);
  }

  delete(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/delete/${id}`);
  }
}
