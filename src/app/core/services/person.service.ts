import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../entities/person.entity';
import { ApiResponse } from '../entities/apiresponse.entity';
import { PersonDTO } from '../dto/person.Dto';


@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private apiUrl = 'http://localhost:8080/api/persons';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResponse<Person[]>> {
    return this.http.get<ApiResponse<Person[]>>(`${this.apiUrl}/getAll`);
  }

  getOne(id: number): Observable<ApiResponse<Person>> {
    return this.http.get<ApiResponse<Person>>(`${this.apiUrl}/getOne/${id}`);
  }

  create(dto: PersonDTO): Observable<ApiResponse<void>> {
    return this.http.post<ApiResponse<void>>(`${this.apiUrl}/create`, dto);
  }

  update(id: number, dto: PersonDTO): Observable<ApiResponse<void>> {
    return this.http.put<ApiResponse<void>>(`${this.apiUrl}/update/${id}`, dto);
  }

  delete(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/delete/${id}`);
  }
}
